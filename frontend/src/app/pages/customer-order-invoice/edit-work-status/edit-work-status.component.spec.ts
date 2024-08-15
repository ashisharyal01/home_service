import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkStatusComponent } from './edit-work-status.component';

describe('EditWorkStatusComponent', () => {
  let component: EditWorkStatusComponent;
  let fixture: ComponentFixture<EditWorkStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
