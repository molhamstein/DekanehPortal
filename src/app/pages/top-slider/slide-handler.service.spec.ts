import { TestBed, inject } from '@angular/core/testing';

import { SlideHandlerService } from './slide-handler.service';

describe('SlideHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlideHandlerService]
    });
  });

  it('should be created', inject([SlideHandlerService], (service: SlideHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
