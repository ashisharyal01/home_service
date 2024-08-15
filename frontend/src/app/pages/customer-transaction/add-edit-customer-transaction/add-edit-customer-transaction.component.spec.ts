import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerTransactionComponent } from './add-edit-customer-transaction.component';

describe('AddEditCustomerTransactionComponent', () => {
  let component: AddEditCustomerTransactionComponent;
  let fixture: ComponentFixture<AddEditCustomerTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomerTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
