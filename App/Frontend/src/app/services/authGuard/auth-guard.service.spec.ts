import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

import { AuthGuardService } from './auth-guard.service';
import {AuthenticatorService} from "../authenticator/authenticator.service";

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  let mockAuthenticatorService = jasmine.createSpyObj(['isConnected']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [{provide: AuthenticatorService, useValue: mockAuthenticatorService}],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(AuthGuardService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
