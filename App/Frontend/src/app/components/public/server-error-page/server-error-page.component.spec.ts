import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorPageComponent } from './server-error-page.component';

import {AuthenticatorService} from "../../../services/authenticator/authenticator.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {of, throwError} from "rxjs";

describe('ServerErrorPageComponent', () => {
  let component: ServerErrorPageComponent;
  let fixture: ComponentFixture<ServerErrorPageComponent>;

  let mockAuthenticatorService = jasmine.createSpyObj(['isConnected']);
  mockAuthenticatorService.isConnected.and.returnValue(throwError({status: 500})); // Assume the server isn't working and cannot be reached

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticatorService, useValue: mockAuthenticatorService}
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ServerErrorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
