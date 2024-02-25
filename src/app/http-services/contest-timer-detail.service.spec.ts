import { TestBed } from '@angular/core/testing';

import { ContestTimerDetailService } from './contest-timer-detail.service';

describe('ContestTimerDetailService', () => {
  let service: ContestTimerDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestTimerDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
