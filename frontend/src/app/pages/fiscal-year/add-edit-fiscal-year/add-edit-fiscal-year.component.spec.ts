import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFiscalYearComponent } from './add-edit-fiscal-year.component';

describe('AddEditFiscalYearComponent', () => {
  let component: AddEditFiscalYearComponent;
  let fixture: ComponentFixture<AddEditFiscalYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFiscalYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFiscalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
