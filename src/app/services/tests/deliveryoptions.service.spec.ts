import { TestBed, inject } from '@angular/core/testing';

import { DeliveryoptionsService } from './deliveryoptions.service';

describe('DeliveryoptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryoptionsService]
    });
  });

  it('should be created', inject([DeliveryoptionsService], (service: DeliveryoptionsService) => {
    expect(service).toBeTruthy();
  }));
});
