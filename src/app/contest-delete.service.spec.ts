import { TestBed } from '@angular/core/testing';

import { ContestDeleteService } from './contest-delete.service';

describe('ContestDeleteService', () => {
  let service: ContestDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
