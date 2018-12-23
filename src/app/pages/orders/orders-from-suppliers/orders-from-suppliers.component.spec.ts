import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdersFromSuppliersComponent} from './orders-from-suppliers.component';

describe('OrdersFromSuppliersComponent', () => {
  let component: OrdersFromSuppliersComponent;
  let fixture: ComponentFixture<OrdersFromSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersFromSuppliersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFromSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
