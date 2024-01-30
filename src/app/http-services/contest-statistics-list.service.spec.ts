import { TestBed } from '@angular/core/testing';

import { ContestStatisticsListService } from './contest-statistics-list.service';

describe('ContestStatisticsListService', () => {
  let service: ContestStatisticsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestStatisticsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
