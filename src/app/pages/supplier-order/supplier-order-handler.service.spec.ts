import { SupplierOrdersHandlerService } from './supplier-order-handler.service';
import {inject, TestBed} from '@angular/core/testing';


describe('SupplierOrdersHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SupplierOrdersHandlerService]
        });
    });

    it('should be created', inject([SupplierOrdersHandlerService], (service: SupplierOrdersHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
