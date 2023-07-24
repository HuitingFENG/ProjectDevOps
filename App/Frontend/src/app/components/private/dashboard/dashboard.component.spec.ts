import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import {AbonnementManagerService} from "../../../services/abonnementManager/abonnement-manager.service";
import {RouterTestingModule} from "@angular/router/testing";
import {NavbarComponent} from "../../reusable/navbar/navbar.component";
import {of} from "rxjs";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockAbonnementManagerService = jasmine.createSpyObj(['getAllAbonnements']);
  mockAbonnementManagerService.getAllAbonnements.and.returnValue(of([
    {
      "id": 2,
      "id_client": 1,
      "date_debut": "2021-09-01T00:00:00.000Z",
      "date_fin": null,
      "vcores": 16,
      "ram": "32 Go",
      "disque": "500 Go",
      "bande_passante": 1000,
      "os": "Debian 10",
      "prix": 6800
    },
    {
      "id": 1,
      "id_client": 1,
      "date_debut": "2021-06-10T00:00:00.000Z",
      "date_fin": "2021-08-31T00:00:00.000Z",
      "vcores": 8,
      "ram": "16 Go",
      "disque": "500 Go",
      "bande_passante": 300,
      "os": "Ubuntu",
      "prix": 3600
    }
  ]))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AbonnementManagerService, useValue: mockAbonnementManagerService}
      ],
      imports: [
        RouterTestingModule
      ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
