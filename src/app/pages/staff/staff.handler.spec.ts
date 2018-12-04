import {inject, TestBed} from '@angular/core/testing';

import {StaffHandler} from './staff.handler';

describe('StaffHandler', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StaffHandler]
        });
    });

    it('should be created', inject([StaffHandler], (service: StaffHandler) => {
        expect(service).toBeTruthy();
    }));
});
