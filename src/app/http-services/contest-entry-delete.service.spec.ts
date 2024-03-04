import { TestBed } from '@angular/core/testing';

import { ContestEntryDeleteService } from './contest-entry-delete.service';

describe('ContestEntryDeleteService', () => {
  let service: ContestEntryDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestEntryDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
