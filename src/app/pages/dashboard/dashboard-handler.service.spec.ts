import {inject, TestBed} from '@angular/core/testing';
import { DashboardHandlerService } from './dashboard-handler.service';


describe('DashboardHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DashboardHandlerService]
        });
    });

    it('should be created', inject([DashboardHandlerService], (service: DashboardHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
