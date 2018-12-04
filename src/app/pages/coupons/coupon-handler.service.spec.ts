import {inject, TestBed} from '@angular/core/testing';

import {CouponHandlerService} from './coupon-handler.service';

describe('CouponHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CouponHandlerService]
        });
    });

    it('should be created', inject([CouponHandlerService], (service: CouponHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
