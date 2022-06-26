import { TestBed } from '@angular/core/testing';

import { ScreenMonitorService } from './screen-monitor.service';

describe('ScreenMonitorService', () => {
  let service: ScreenMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
