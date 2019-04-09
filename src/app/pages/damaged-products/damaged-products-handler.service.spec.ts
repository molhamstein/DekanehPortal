import {inject, TestBed} from '@angular/core/testing';
import { DamagedProductHandler } from './damaged-products-handler';


describe('DamagedProductHandler', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DamagedProductHandler]
        });
    });

    it('should be created', inject([DamagedProductHandler], (service: DamagedProductHandler) => {
        expect(service).toBeTruthy();
    }));
});
