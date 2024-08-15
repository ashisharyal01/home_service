import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRegisterUserComponent } from './add-edit-register-user.component';

describe('AddEditRegisterUserComponent', () => {
  let component: AddEditRegisterUserComponent;
  let fixture: ComponentFixture<AddEditRegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRegisterUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
