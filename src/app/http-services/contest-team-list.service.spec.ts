import { TestBed } from '@angular/core/testing';

import { ContestTeamListService } from './contest-team-list.service';

describe('ContestTeamListService', () => {
  let service: ContestTeamListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestTeamListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
