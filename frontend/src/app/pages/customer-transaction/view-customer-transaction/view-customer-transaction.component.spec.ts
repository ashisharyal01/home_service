import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerTransactionComponent } from './view-customer-transaction.component';

describe('ViewCustomerTransactionComponent', () => {
  let component: ViewCustomerTransactionComponent;
  let fixture: ComponentFixture<ViewCustomerTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
