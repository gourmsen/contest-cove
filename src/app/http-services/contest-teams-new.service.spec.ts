import { TestBed } from '@angular/core/testing';

import { ContestTeamsNewService } from './contest-teams-new.service';

describe('ContestTeamsNewService', () => {
  let service: ContestTeamsNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestTeamsNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
