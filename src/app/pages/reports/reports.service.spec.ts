import {inject, TestBed} from '@angular/core/testing';
import { ReportsHandler } from './reports-handler';


describe('ReportsHandler', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReportsHandler]
        });
    });

    it('should be created', inject([ReportsHandler], (service: ReportsHandler) => {
        expect(service).toBeTruthy();
    }));
});
