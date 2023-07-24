import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

import {AuthenticatorService} from "../../../services/authenticator/authenticator.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let mockAuthenticatorService = jasmine.createSpyObj(['disconnect']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticatorService, useValue: mockAuthenticatorService}
      ],
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
