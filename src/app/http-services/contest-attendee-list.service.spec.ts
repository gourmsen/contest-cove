import { TestBed } from '@angular/core/testing';

import { ContestAttendeeListService } from './contest-attendee-list.service';

describe('ContestAttendeeListService', () => {
  let service: ContestAttendeeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestAttendeeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
