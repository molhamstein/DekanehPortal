import {inject, TestBed} from '@angular/core/testing';

import {OrdersHandlerService} from './orders-handler.service';

describe('OrdersHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OrdersHandlerService]
        });
    });

    it('should be created', inject([OrdersHandlerService], (service: OrdersHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
