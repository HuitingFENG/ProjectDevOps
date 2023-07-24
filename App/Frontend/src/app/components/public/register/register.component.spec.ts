import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

import {AuthenticatorService} from "../../../services/authenticator/authenticator.service";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let mockAuthenticatorService = jasmine.createSpyObj(['register']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticatorService, useValue: mockAuthenticatorService}
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
