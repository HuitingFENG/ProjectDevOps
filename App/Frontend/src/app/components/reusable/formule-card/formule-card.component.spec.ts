import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleCardComponent } from './formule-card.component';

import {FactureManagerService} from "../../../services/factureManager/facture-manager.service";

describe('FormuleCardComponent', () => {
  let component: FormuleCardComponent;
  let fixture: ComponentFixture<FormuleCardComponent>;

  let mockFactureManagerService = jasmine.createSpyObj(['formatCurrency']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: FactureManagerService, useValue: mockFactureManagerService}
      ],
      declarations: [ FormuleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormuleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
