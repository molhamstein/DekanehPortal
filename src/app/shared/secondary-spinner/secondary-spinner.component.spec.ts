import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondarySpinnerComponent } from './secondary-spinner.component';

describe('SecondarySpinnerComponent', () => {
  let component: SecondarySpinnerComponent;
  let fixture: ComponentFixture<SecondarySpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondarySpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondarySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
