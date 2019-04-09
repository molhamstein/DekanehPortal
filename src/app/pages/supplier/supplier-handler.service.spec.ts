import {inject, TestBed} from '@angular/core/testing';
import { SupplierHandlerService } from './supplier-handler.service';


describe('SupplierHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SupplierHandlerService]
        });
    });

    it('should be created', inject([SupplierHandlerService], (service: SupplierHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
