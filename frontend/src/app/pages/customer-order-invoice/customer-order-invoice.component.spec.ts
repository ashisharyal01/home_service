import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderInvoiceComponent } from './customer-order-invoice.component';

describe('CustomerOrderInvoiceComponent', () => {
  let component: CustomerOrderInvoiceComponent;
  let fixture: ComponentFixture<CustomerOrderInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
