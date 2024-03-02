import { TestBed } from '@angular/core/testing';

import { ContestEntryListService } from './contest-entry-list.service';

describe('ContestEntryListService', () => {
  let service: ContestEntryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestEntryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
