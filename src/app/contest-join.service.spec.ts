import { TestBed } from '@angular/core/testing';

import { ContestJoinService } from './contest-join.service';

describe('ContestJoinService', () => {
  let service: ContestJoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestJoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
