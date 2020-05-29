import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersAddEditComponent } from './add-edit.component';

describe('OwnersAddEditComponent', () => {
  let component: OwnersAddEditComponent;
  let fixture: ComponentFixture<OwnersAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      declarations: [OwnersAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
