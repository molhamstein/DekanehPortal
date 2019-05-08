import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { AbstractNewProductComponent } from './abstract-new-product.component';


describe('AbstractNewProductComponent', () => {
    let component: AbstractNewProductComponent;
    let fixture: ComponentFixture<AbstractNewProductComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AbstractNewProductComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractNewProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
