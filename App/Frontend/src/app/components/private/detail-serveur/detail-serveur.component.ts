import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbonnementManagerService} from "../../../services/abonnementManager/abonnement-manager.service";
import {Abonnement} from "../../../interfaces/abonnement";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {MockServerMonitoringService} from "../../../services/mock-server-monitoring/mock-server-monitoring.service";

@Component({
  selector: 'app-detail-serveur',
  templateUrl: './detail-serveur.component.html',
  styleUrls: ['./detail-serveur.component.css']
})
export class DetailServeurComponent implements OnInit {

  faPowerOff = faPowerOff;

  cancelModalRef?: BsModalRef;

  id : number = 0;
  on: boolean = false;
  changing_state: boolean = false;
  expired: boolean = false;

  abonnement: Abonnement | null = null;

  // Données des graphiques
  LineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          stepSize: 5
        }
      }]
    }
  };
  DoughnutChartOptions = {
    responsive: true,
  };
  ChartUseLegend = false;

  CpuUseLabels: Label[] = [];
  CpuUseData: ChartDataSets[] = [];
  CpuUseColor: Color[] = [{borderColor: 'rgba(150, 255, 150, 50)', pointBackgroundColor: 'rgb(0, 150, 0)'}];

  RamUseLabels: Label[] = [];
  RamUseData: ChartDataSets[] = [];
  RamUseColor: Color[] = [{borderColor: 'rgba(100, 100, 255, 50)', pointBackgroundColor: 'rgb(0, 0, 150)'}];

  DiskUseData: ChartDataSets[] = [];
  DiskUseLabels: Label[] = ['Occupé', 'Disponible'];
  DiskUseColors: Color[] = [{backgroundColor: ['rgb(255, 100, 100)', 'rgb(150, 150, 150)']}]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private abonnementManager: AbonnementManagerService,
    private mockServerMonitoring: MockServerMonitoringService,
    private modalService: BsModalService
  ) {
    // On invente des données pour les graphiques
    // Évidemment dans une vraie application on communiquerait avec notre backend et notre infrastructure pour obtenir de vraies données
    // Et on aurait des outils de monitoring un peu plus poussés, réalistes, avec davantage d'options, etc
    this.CpuUseLabels = this.mockServerMonitoring.constructLabels(24);
    this.CpuUseData = this.mockServerMonitoring.constructData(this.CpuUseLabels.length, "Utilisation CPU");

    this.RamUseLabels = this.mockServerMonitoring.constructLabels(24);
    this.RamUseData = this.mockServerMonitoring.constructData(this.CpuUseLabels.length, "Utilisation RAM");

    // On choisir un pourcentage aléatoire d'occupation du disque compris entre 83.7% et 12.3%
    const random_percentage = Math.max(Math.min(Math.round(Math.random() * 100 * 100)/100, 83.7), 12.3);
    this.DiskUseData = [{data: [random_percentage, 100-random_percentage]}];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idServeur'];
    this.on = JSON.parse(localStorage.getItem("server" + this.id) ?? "false"); // On récupère le statut du serveur pour simuler de la persistence
    this.abonnementManager.getAbonnement(this.id).subscribe(val => {
      this.abonnement = val
      // Vérification pour savoir si le serveur est toujours actif
      if (this.abonnement?.date_fin && this.abonnement?.date_fin < new Date()){
        this.expired = true;
        localStorage.setItem("server" + this.id, JSON.stringify(false)); // On marque que ce serveur est éteint à jamais
      }
    }, _ => this.router.navigateByUrl("/dashboard"));
  }

  /**
   * Allume le serveur s'il est éteint, et éteint le serveur s'il est allumé
   */
  flipOnOff(){
    this.changing_state = true;
    setTimeout(() => {
      this.on = !this.on;
      this.changing_state = false;
      // Évidemment, dans une vraie application on ferait un traitement plus poussé en envoyant une commande au backend qui piloterait l'achitecture cloud/le datacenter etc
      // Ici, on simule de la persistence avec le localStorage
      localStorage.setItem("server" + this.id, JSON.stringify(this.on));
    }, Math.random() * (1000) + 500) // Une durée aléatoire entre 500 et 1500ms
  }

  /**
   * Retourne le premier jour du mois prochain sous forme de string
   */
  nextBillDate(): string {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth()+1, 1).toLocaleDateString()
  }

  openCancelModal(template: TemplateRef<any>) {
    this.cancelModalRef = this.modalService.show(template);
  }

  cancelAbonnement() {
    this.cancelModalRef?.hide();
    this.abonnementManager.deleteAbonnement(this.id).subscribe(() => {
      window.location.reload();
    }, () => {
      alert("Une erreur est survenue durant l'annulation, veuillez contacter le service client.");
    })
  }
}
