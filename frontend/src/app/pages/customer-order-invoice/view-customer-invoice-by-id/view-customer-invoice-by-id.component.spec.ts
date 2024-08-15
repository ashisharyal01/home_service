import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerInvoiceByIdComponent } from './view-customer-invoice-by-id.component';

describe('ViewCustomerInvoiceByIdComponent', () => {
  let component: ViewCustomerInvoiceByIdComponent;
  let fixture: ComponentFixture<ViewCustomerInvoiceByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerInvoiceByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerInvoiceByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
