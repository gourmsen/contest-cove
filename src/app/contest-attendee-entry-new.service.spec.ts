import { TestBed } from '@angular/core/testing';

import { ContestAttendeeEntryNewService } from './contest-attendee-entry-new.service';

describe('ContestAttendeeEntryNewService', () => {
  let service: ContestAttendeeEntryNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestAttendeeEntryNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
