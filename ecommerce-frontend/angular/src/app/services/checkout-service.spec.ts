import { TestBed } from '@angular/core/testing';

import { CheckoutService } from './checkout-service';

describe('Checkout', () => {
  let service: CheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
