import { TestBed } from '@angular/core/testing';

import { ProcessHTTPService } from './process-http.service';

describe('ProcessHTTPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHTTPService = TestBed.get(ProcessHTTPService);
    expect(service).toBeTruthy();
  });
});
