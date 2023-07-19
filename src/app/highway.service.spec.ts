import { TestBed } from '@angular/core/testing';

import { HighwayService } from './highway.service';

describe('HighwayService', () => {
  let service: HighwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
