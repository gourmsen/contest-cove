import { TestBed } from '@angular/core/testing';

import { ContestTeamsUpdateService } from './contest-teams-update.service';

describe('ContestTeamsUpdateService', () => {
  let service: ContestTeamsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestTeamsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
