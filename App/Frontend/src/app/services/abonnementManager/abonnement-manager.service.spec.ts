import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";

import { AbonnementManagerService } from './abonnement-manager.service';

describe('AbonnementManagerService', () => {
  let service: AbonnementManagerService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AbonnementManagerService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
