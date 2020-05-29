import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsAddEditComponent } from './add-edit.component';

describe('PetsAddEditComponent', () => {
  let component: PetsAddEditComponent;
  let fixture: ComponentFixture<PetsAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      declarations: [PetsAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
