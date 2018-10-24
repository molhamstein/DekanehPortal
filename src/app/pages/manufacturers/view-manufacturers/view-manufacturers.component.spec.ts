import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManufacturersComponent } from './view-manufacturers.component';

describe('ViewManufacturersComponent', () => {
  let component: ViewManufacturersComponent;
  let fixture: ComponentFixture<ViewManufacturersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewManufacturersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
