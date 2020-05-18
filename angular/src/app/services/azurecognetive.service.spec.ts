import { TestBed } from '@angular/core/testing';

import { AzurecognetiveService } from './azurecognetive.service';

describe('AzurecognetiveService', () => {
  let service: AzurecognetiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzurecognetiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
