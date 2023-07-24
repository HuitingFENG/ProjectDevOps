import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFactureComponent } from './detail-facture.component';

import { FactureManagerService } from "../../../services/factureManager/facture-manager.service";

import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('DetailFactureComponent', () => {
  let component: DetailFactureComponent;
  let fixture: ComponentFixture<DetailFactureComponent>;

  let mockFactureManagerService = jasmine.createSpyObj(['getFacture', 'formatCurrency']);
  mockFactureManagerService.getFacture.withArgs(1).and.returnValue(of(
    {
      "bande_passante": 300,
      "date_facture": new Date("2021-06-10T00:00:00.000Z"),
      "disque": "500 Go",
      "disque_prix": 800,
      "id_abonnement": 1,
      "id_facture": 1,
      "io_prix": 500,
      "montant": 3600,
      "os": "Ubuntu",
      "os_prix": 0,
      "ram": "16 Go",
      "ram_prix": 1500,
      "vcores": 8,
      "vcores_prix": 800
    }
  ))
  mockFactureManagerService.formatCurrency.withArgs(800).and.returnValue(8.00)
  mockFactureManagerService.formatCurrency.withArgs(500).and.returnValue(5.00)
  mockFactureManagerService.formatCurrency.withArgs(3600).and.returnValue(36.00)
  mockFactureManagerService.formatCurrency.withArgs(1500).and.returnValue(15.00)
  mockFactureManagerService.formatCurrency.withArgs(0).and.returnValue(0.00)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: FactureManagerService, useValue: mockFactureManagerService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params : {idFacture: 1}}
          }
        }
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ DetailFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
