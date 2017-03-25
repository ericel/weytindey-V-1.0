import { TestBed, inject } from '@angular/core/testing';

import { PageweyService } from './pagewey.service';

describe('PageweyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageweyService]
    });
  });

  it('should ...', inject([PageweyService], (service: PageweyService) => {
    expect(service).toBeTruthy();
  }));
});
