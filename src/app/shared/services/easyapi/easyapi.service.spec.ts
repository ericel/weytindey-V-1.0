/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EasyapiService } from './easyapi.service';

describe('EasyapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EasyapiService]
    });
  });

  it('should ...', inject([EasyapiService], (service: EasyapiService) => {
    expect(service).toBeTruthy();
  }));
});
