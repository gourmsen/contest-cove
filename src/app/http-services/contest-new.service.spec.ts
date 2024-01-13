import { TestBed } from '@angular/core/testing';

import { ContestNewService } from './contest-new.service';

describe('ContestNewService', () => {
  let service: ContestNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
