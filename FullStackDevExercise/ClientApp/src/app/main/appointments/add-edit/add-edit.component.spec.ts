import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsAddEditComponent } from './add-edit.component';

describe('AppointmentsAddEditComponent', () => {
  let component: AppointmentsAddEditComponent;
  let fixture: ComponentFixture<AppointmentsAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      declarations: [AppointmentsAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
