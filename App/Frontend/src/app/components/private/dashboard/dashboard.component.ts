import { Component, OnInit } from '@angular/core';
import {AbonnementManagerService} from "../../../services/abonnementManager/abonnement-manager.service";
import {Abonnement} from "../../../interfaces/abonnement";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  abonnements: Abonnement[] = [];
  loaded: boolean = false;

  constructor(
    private abonnementManager: AbonnementManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.abonnementManager.getAllAbonnements().subscribe(abonnements => {
      this.abonnements = abonnements.sort((a, b) => {
        // On trie selon la date de fin pour afficher d'abord les abonnements qui sont en cours
        if (a.date_fin && b.date_fin){
          return a.date_fin > b.date_fin ? -1 : 1
        } else if (a.date_fin && !b.date_fin){
          return 1;
        } else if (!a.date_fin && b.date_fin){
          return -1;
        } else {
          return a.date_debut > b.date_debut ? -1 : 1;
        }
      });
      this.loaded = true;
    })
  }


  countServers(): string {
    const count = this.abonnements.length;
    return `${count} abonnement${count > 1 ? 's' : ''}`;
  }

  navigateToRent(): void {
    this.router.navigateByUrl('/louer');
  }

  navigateToServer(id: number): void {
    this.router.navigate(['/serveur', id]);
  }
}
