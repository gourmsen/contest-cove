import { TestBed } from '@angular/core/testing';

import { ContestObjectiveListService } from './contest-objective-list.service';

describe('ContestObjectiveListService', () => {
  let service: ContestObjectiveListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestObjectiveListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
