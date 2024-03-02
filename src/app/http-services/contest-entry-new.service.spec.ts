import { TestBed } from '@angular/core/testing';

import { ContestEntryNewService } from './contest-entry-new.service';

describe('ContestEntryNewService', () => {
  let service: ContestEntryNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestEntryNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
