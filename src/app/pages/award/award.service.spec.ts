import { AbstractProductHandler } from './abstract-product-handler';
import {inject, TestBed} from '@angular/core/testing';


describe('AbstractProductHandler', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AbstractProductHandler]
        });
    });

    it('should be created', inject([AbstractProductHandler], (service: AbstractProductHandler) => {
        expect(service).toBeTruthy();
    }));
});
