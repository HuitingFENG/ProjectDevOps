import {Component, Input, OnInit} from '@angular/core';
import {Formule} from "../../../interfaces/formule";
import {FactureManagerService} from "../../../services/factureManager/facture-manager.service";

@Component({
  selector: 'app-formule-card',
  templateUrl: './formule-card.component.html',
  styleUrls: ['./formule-card.component.css']
})
export class FormuleCardComponent implements OnInit {

  @Input() formule: Formule | null = null;

  constructor(
    public factureManager: FactureManagerService
  ) { }

  ngOnInit(): void {
  }
}
