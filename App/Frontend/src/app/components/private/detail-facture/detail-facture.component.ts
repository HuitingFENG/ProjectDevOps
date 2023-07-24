import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FactureManagerService} from "../../../services/factureManager/facture-manager.service";
import {Facture} from "../../../interfaces/facture";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.css']
})
export class DetailFactureComponent implements OnInit {

  environment = environment;
  facture: Facture | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public factureManager: FactureManagerService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['idFacture']
    this.factureManager.getFacture(id).subscribe((val) => {
      this.facture = val;
    }, (_) => {
      // Dans le cas où la facture n'existe pas
      this.router.navigateByUrl('/factures');
    })
  }

}
