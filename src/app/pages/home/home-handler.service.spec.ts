import { HomeHandlerService } from './home-handler.service';
import {inject, TestBed} from '@angular/core/testing';


describe('HomeHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HomeHandlerService]
        });
    });

    it('should be created', inject([HomeHandlerService], (service: HomeHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
