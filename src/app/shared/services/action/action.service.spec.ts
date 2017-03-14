/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActionService } from './action.service';

describe('ActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionService]
    });
  });

  it('should ...', inject([ActionService], (service: ActionService) => {
    expect(service).toBeTruthy();
  }));
});
