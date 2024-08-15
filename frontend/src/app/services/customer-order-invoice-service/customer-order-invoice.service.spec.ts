import { TestBed } from '@angular/core/testing';

import { CustomerOrderInvoiceService } from './customer-order-invoice.service';

describe('CustomerOrderInvoiceService', () => {
  let service: CustomerOrderInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOrderInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
