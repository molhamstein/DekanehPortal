import {inject, TestBed} from '@angular/core/testing';
import { LevelHandlerService } from './level-handler.service';


describe('LevelHandlerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LevelHandlerService]
        });
    });

    it('should be created', inject([LevelHandlerService], (service: LevelHandlerService) => {
        expect(service).toBeTruthy();
    }));
});
