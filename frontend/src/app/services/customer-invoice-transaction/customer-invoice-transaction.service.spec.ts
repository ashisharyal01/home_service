import { TestBed } from '@angular/core/testing';

import { CustomerInvoiceTransactionService } from './customer-invoice-transaction.service';

describe('CustomerInvoiceTransactionService', () => {
  let service: CustomerInvoiceTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerInvoiceTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
