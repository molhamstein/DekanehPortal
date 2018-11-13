import { TestBed, inject } from '@angular/core/testing';

import { AreaHandlerService } from './area-handler.service';

describe('AreaHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaHandlerService]
    });
  });

  it('should be created', inject([AreaHandlerService], (service: AreaHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
