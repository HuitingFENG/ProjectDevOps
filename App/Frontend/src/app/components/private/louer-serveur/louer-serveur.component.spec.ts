import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LouerServeurComponent } from './louer-serveur.component';

import { AbonnementManagerService } from "../../../services/abonnementManager/abonnement-manager.service";
import { FactureManagerService } from "../../../services/factureManager/facture-manager.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";

describe('LouerServeurComponent', () => {
  let component: LouerServeurComponent;
  let fixture: ComponentFixture<LouerServeurComponent>;

  let mockAbonnementManagerService = jasmine.createSpyObj(['getFormules', 'getComponentOptions']);
  mockAbonnementManagerService.getFormules.and.returnValue(of([]))
  mockAbonnementManagerService.getComponentOptions.and.returnValue(of({
    ram: [],
    vcore: [],
    os: [],
    disque: [],
    io: []
  }))
  let mockFactureManagerService = jasmine.createSpyObj(['formatCurrency']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers : [
        { provide: AbonnementManagerService, useValue: mockAbonnementManagerService},
        { provide: FactureManagerService, useValue: mockFactureManagerService},
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ LouerServeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LouerServeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
