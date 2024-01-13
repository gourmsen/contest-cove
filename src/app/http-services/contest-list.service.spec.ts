import { TestBed } from '@angular/core/testing';

import { ContestListService } from './contest-list.service';

describe('ContestListService', () => {
  let service: ContestListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
