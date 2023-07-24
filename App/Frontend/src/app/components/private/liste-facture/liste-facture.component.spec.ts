import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFactureComponent } from './liste-facture.component';

import { FactureManagerService } from "../../../services/factureManager/facture-manager.service";
import {of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('ListeFactureComponent', () => {
  let component: ListeFactureComponent;
  let fixture: ComponentFixture<ListeFactureComponent>;

  let mockFactureManagerService = jasmine.createSpyObj(['getAllFactures', 'formatCurrency']);
  mockFactureManagerService.getAllFactures.and.returnValue(of([
    {
      "date_facture": new Date("2021-10-01T00:00:00.000Z"),
      "id_abonnement": 2,
      "id_facture": 5,
      "montant": 6800
    },
    {
      "date_facture": new Date("2021-09-01T00:00:00.000Z"),
      "id_abonnement": 2,
      "id_facture": 4,
      "montant": 6800
    },
    {
      "date_facture": new Date("2021-08-01T00:00:00.000Z"),
      "id_abonnement": 1,
      "id_facture": 3,
      "montant": 3600
    },
    {
      "date_facture": new Date("2021-07-01T00:00:00.000Z"),
      "id_abonnement": 1,
      "id_facture": 2,
      "montant": 3600
    },
    {
      "date_facture": new Date("2021-06-10T00:00:00.000Z"),
      "id_abonnement": 1,
      "id_facture": 1,
      "montant": 3600
    }
  ]))
  mockFactureManagerService.formatCurrency.withArgs(3600).and.returnValue(36.00)
  mockFactureManagerService.formatCurrency.withArgs(6800).and.returnValue(68.00)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: FactureManagerService, useValue: mockFactureManagerService},
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ListeFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
