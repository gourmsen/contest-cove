import { TestBed } from '@angular/core/testing';

import { ContestTimerNewService } from './contest-timer-new.service';

describe('ContestTimerNewService', () => {
  let service: ContestTimerNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestTimerNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
