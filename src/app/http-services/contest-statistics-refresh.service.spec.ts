import { TestBed } from '@angular/core/testing';

import { ContestStatisticsRefreshService } from './contest-statistics-refresh.service';

describe('ContestStatisticsRefreshService', () => {
  let service: ContestStatisticsRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestStatisticsRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
