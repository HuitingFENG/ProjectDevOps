import { TestBed } from '@angular/core/testing';

import { MockServerMonitoringService } from './mock-server-monitoring.service';

describe('MockServerMonitoringService', () => {
  let service: MockServerMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockServerMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
