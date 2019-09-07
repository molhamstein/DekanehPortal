import {inject, TestBed} from '@angular/core/testing';
import { ComplainHandlerService } from './complain-handler.service';


describe('CouponHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ComplainHandlerService]
        });
    });

    it('should be created', inject([ComplainHandlerService], (service: ComplainHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
