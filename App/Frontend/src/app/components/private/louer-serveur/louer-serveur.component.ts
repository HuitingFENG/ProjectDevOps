import { Component, OnInit } from '@angular/core';
import {Formule} from "../../../interfaces/formule";
import {AbonnementManagerService} from "../../../services/abonnementManager/abonnement-manager.service";
import {FactureManagerService} from "../../../services/factureManager/facture-manager.service";
import {Router} from "@angular/router";

import {faMicrochip} from "@fortawesome/free-solid-svg-icons";
import {faMemory} from "@fortawesome/free-solid-svg-icons";
import {faHdd} from "@fortawesome/free-solid-svg-icons";
import {faNetworkWired} from "@fortawesome/free-solid-svg-icons";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-louer-serveur',
  templateUrl: './louer-serveur.component.html',
  styleUrls: ['./louer-serveur.component.css']
})
export class LouerServeurComponent implements OnInit {

  faMicrochip = faMicrochip;
  faMemory = faMemory;
  faHdd = faHdd;
  faNetworkWired = faNetworkWired;
  faQuestionCircle = faQuestionCircle;

  readonly OS_tooltip = "Les systèmes d'exploitation de type UNIX (CentOS, Debian, Ubuntu) ainsi que Windows Server Core sont plus légers et plus performants, mais nécéssitent de maitriser un environnement en ligne de commande.";
  readonly Vcore_tooltip = "C'est le nombre de coeurs attribués à votre serveur. Plus il y en a, plus votre serveur sera puissant.";
  readonly RAM_tooltip = "C'est la RAM de votre serveur. Plus il y en a, plus votre serveur pourra exécuter de programmes simultanément, et plus ceux-ci pourront être gourmands en mémoire.";
  readonly Disque_tooltip = "C'est la capacité de stockage de votre serveur. Plus elle est importante, plus il pourra contenir de fichiers.";
  readonly IO_tooltip = "C'est la vitesse du réseau auquel votre serveur sera connecté. Plus elle est important, plus les échanges seront rapides.";

  formules: Formule[] = [];
  authorized_ram: { "quantite": number, "affichage": string, "prix": number }[] = [];
  authorized_vcore: { "nombre": number, "min_ram": number, "max_ram": number, "prix": number }[] = [];
  authorized_os: { "nom_systeme": string, "min_ram": number, "prix": number }[] = [];
  authorized_disque: { "espace": number, "affichage": string, "prix": number }[] = [];
  authorized_io: { "vitesse": number, "prix": number }[] = [];

  selected_vcores: number | null = null;
  selected_ram: number | null = null;
  selected_disque: number | null = null;
  selected_io: number | null = null;
  selected_os: string | null = null;

  constructor(
    private abonnementManager: AbonnementManagerService,
    public factureManager: FactureManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.abonnementManager.getFormules().subscribe(val => this.formules = val)
    this.abonnementManager.getComponentOptions().subscribe(val => {
      this.authorized_ram = val.ram;
      this.authorized_vcore = val.vcore;
      this.authorized_os = val.os;
      this.authorized_disque = val.disque;
      this.authorized_io = val.io;
    })
  }

  autoConfigure(formule: Formule) {
    if(this.authorized_ram.length > 0 && this.authorized_disque.length > 0){
      this.selected_vcores = formule.vcores;
      this.selected_ram = this.authorized_ram.find(item => item.affichage === formule.ram)?.quantite ?? 512;
      this.selected_disque = this.authorized_disque.find(item  => item.affichage === formule.disque)?.espace ?? 10;
      this.selected_io = formule.bande_passante;
      this.selected_os = null;
    }
  }

  /**
   * Cette méthode détermine si la quantité de ram passée en paramètre est compatible avec l'OS et le processeur choisis
   * @param quantite
   */
  isValidRamOption(quantite: number): boolean {
    if (this.selected_vcores || this.selected_os){
      const min_vcore_ram = this.authorized_vcore.find(item => item.nombre === this.selected_vcores)?.min_ram ?? 0;
      const max_vcore_ram = this.authorized_vcore.find(item => item.nombre === this.selected_vcores)?.max_ram ?? Number.MAX_VALUE;
      const min_os_ram = this.authorized_os.find(item => item.nom_systeme === this.selected_os)?.min_ram ?? 0;

      return quantite >= min_vcore_ram && quantite <= max_vcore_ram && quantite >= min_os_ram;
    } else {
      // Si rien n'est choisi, tous les choix sont valides
      return true;
    }
  }

  /**
   * Cette méthode détermine si les restrictions du vcore passés en paramètres sont compatibles avec la RAM choisie
   * @param min_ram
   * @param max_ram
   */
  isValidVcoreOption(min_ram: number, max_ram: number){
    if(this.selected_ram){
      return this.selected_ram >= min_ram && this.selected_ram <= max_ram;
    } else {
      // Si rien n'est choisi, tous les choix sont valides
      return true;
    }
  }

  /**
   * Cette méthode détermine si les restrictions de l'os passés en paramètres sont compatibles avec la RAM choisie
   * @param min_ram
   */
  isValidOSOption(min_ram: number){
    if(this.selected_ram){
      return this.selected_ram >= min_ram;
    } else {
      // Si rien n'est choisi, tous les choix sont valides
      return true;
    }

  }

  areChoicesValid() {
    return this.selected_vcores != null && this.selected_ram != null && this.selected_io != null && this.selected_os != null && this.selected_disque != null;
  }

  buyServer() {
    if (this.areChoicesValid()){
      // @ts-ignore Les propriétés ne peuvent pas être null compte tenu du check de areChoicesValid(). Mais Typescript ne le voit pas.
      this.abonnementManager.addAbonnement(this.selected_vcores, this.selected_ram, this.selected_os, this.selected_disque, this.selected_io).subscribe(
        _ => this.router.navigateByUrl("/dashboard"),
        _ => alert("Une erreur est survenue, veuillez réessayer")
      );
    }
  }

  readonly logos: { [id: string]: string} = {
    CentOS : "CentOS_logo.png",
    Debian : "Debian_logo.png",
    Ubuntu : "Ubuntu_logo.png",
    Windows : "WindowsServer_logo.png",
  }

  searchLogo(os: string): string {
    const prefix = os.split(" ")[0];
    const path = this.logos[prefix];

    if (path) {
      return 'assets/' + path;
    } else {
      return 'assets/default_logo.png';
    }

  }

  displayTotal(): string {
    let total = 0;
    total += this.authorized_vcore.find(item => item.nombre === this.selected_vcores)?.prix ?? 0;
    total += this.authorized_ram.find(item => item.quantite === this.selected_ram)?.prix ?? 0;
    total += this.authorized_os.find(item => item.nom_systeme === this.selected_os)?.prix ?? 0;
    total += this.authorized_disque.find(item => item.espace === this.selected_disque)?.prix ?? 0;
    total += this.authorized_io.find(item => item.vitesse === this.selected_io)?.prix ?? 0;

    return this.factureManager.formatCurrency(total);
  }

  resetChoices() {
    this.selected_vcores = null;
    this.selected_ram = null;
    this.selected_disque = null;
    this.selected_io = null;
    this.selected_os = null;
  }
}
