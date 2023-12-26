import { TestBed } from '@angular/core/testing';

import { ContestLeaveService } from './contest-leave.service';

describe('ContestLeaveService', () => {
  let service: ContestLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
