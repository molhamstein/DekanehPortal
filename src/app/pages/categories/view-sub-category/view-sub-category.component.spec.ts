import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubCategoryComponent } from './view-sub-category.component';

describe('ViewSubCategoryComponent', () => {
  let component: ViewSubCategoryComponent;
  let fixture: ComponentFixture<ViewSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
