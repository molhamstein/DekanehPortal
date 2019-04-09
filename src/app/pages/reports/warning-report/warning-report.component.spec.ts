import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AbstractProductListComponent} from './abstract-product-list.component';

describe('AbstractProductListComponent', () => {
    let component: AbstractProductListComponent;
    let fixture: ComponentFixture<AbstractProductListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AbstractProductListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
