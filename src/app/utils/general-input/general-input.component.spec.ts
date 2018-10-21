import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInputComponent } from './general-input.component';

describe('GeneralInputComponent', () => {
  let component: GeneralInputComponent;
  let fixture: ComponentFixture<GeneralInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
