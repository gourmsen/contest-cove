import { TestBed } from '@angular/core/testing';

import { ContestAttendeeEntryListService } from './contest-attendee-entry-list.service';

describe('ContestAttendeeEntryListService', () => {
  let service: ContestAttendeeEntryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestAttendeeEntryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
