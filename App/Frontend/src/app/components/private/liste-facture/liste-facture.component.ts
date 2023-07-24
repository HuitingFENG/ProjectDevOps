import { Component, OnInit } from '@angular/core';
import {FacturePreview} from "../../../interfaces/facture-preview";
import {FactureManagerService} from "../../../services/factureManager/facture-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-facture',
  templateUrl: './liste-facture.component.html',
  styleUrls: ['./liste-facture.component.css']
})
export class ListeFactureComponent implements OnInit {

  factures: FacturePreview[] = [];
  loaded: boolean = false;

  constructor(
    public factureManager: FactureManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.factureManager.getAllFactures().subscribe((val) => {
      this.factures = val.sort((a, b) => {
        return a > b ? 1 : -1;
      });
      this.loaded = true;
    })
  }

  countFactures(): string {
    const count = this.factures.length;
    return `${count} facture${count > 1 ? 's' : ''}`;
  }

  navigateToFacture(id_facture: number): void {
    this.router.navigate(['/facture', id_facture]);
  }
}
