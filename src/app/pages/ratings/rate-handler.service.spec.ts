import {inject, TestBed} from '@angular/core/testing';

import {RateHandlerService} from './rate-handler.service';

describe('RateHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RateHandlerService]
        });
    });

    it('should be created', inject([RateHandlerService], (service: RateHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
