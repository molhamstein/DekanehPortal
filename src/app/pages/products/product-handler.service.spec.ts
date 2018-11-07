import {TestBed, inject} from '@angular/core/testing';

import {ProductHandler} from './product-handler';

describe('ProductHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductHandler]
    });
  });

  it('should be created', inject([ProductHandler], (service: ProductHandler) => {
    expect(service).toBeTruthy();
  }));
});
