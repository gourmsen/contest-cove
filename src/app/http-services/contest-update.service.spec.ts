import { TestBed } from '@angular/core/testing';

import { ContestUpdateService } from './contest-update.service';

describe('ContestUpdateService', () => {
  let service: ContestUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
