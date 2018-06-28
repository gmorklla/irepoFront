import { TestBed, inject } from '@angular/core/testing';

import { WHeightService } from './w-height.service';

describe('WHeightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WHeightService]
    });
  });

  it('should be created', inject([WHeightService], (service: WHeightService) => {
    expect(service).toBeTruthy();
  }));
});
