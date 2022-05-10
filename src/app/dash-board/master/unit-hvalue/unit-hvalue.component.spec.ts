import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitHvalueComponent } from './unit-hvalue.component';

describe('UnitHvalueComponent', () => {
  let component: UnitHvalueComponent;
  let fixture: ComponentFixture<UnitHvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitHvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitHvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
