import {inject, TestBed} from '@angular/core/testing';

import {NotificationHandlerService} from './notification-handler.service';

describe('NotificationHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationHandlerService]
        });
    });

    it('should be created', inject([NotificationHandlerService], (service: NotificationHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
