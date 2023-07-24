import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";

import { FactureManagerService } from './facture-manager.service';

describe('FactureManagerService', () => {
  let service: FactureManagerService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FactureManagerService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatCurrency()', () => {
    it('should take a price in cents and return it in euros', () => {
      expect(service.formatCurrency(100)).toEqual(`1,00\xa0€`);
      expect(service.formatCurrency(1)).toEqual(`0,01\xa0€`);
      expect(service.formatCurrency(0)).toEqual(`0,00\xa0€`);
      expect(service.formatCurrency(1000)).toEqual(`10,00\xa0€`);
      expect(service.formatCurrency(1001)).toEqual(`10,01\xa0€`);
      expect(service.formatCurrency(10001)).toEqual(`100,01\xa0€`);
      expect(service.formatCurrency(100001)).toEqual(`1\u202f000,01\xa0€`);
    })

    it('should not use another currency format', () => {
      expect(service.formatCurrency(100)).not.toContain('$');
      expect(service.formatCurrency(100)).not.toContain('£');
      expect(service.formatCurrency(100)).not.toContain('¥');
    })
  })
});
