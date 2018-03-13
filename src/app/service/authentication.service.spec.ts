import { TestBed, inject } from '@angular/core/testing';

import { AuthenticatonService } from './authenticaton.service';

describe('AuthenticatonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatonService]
    });
  });

  it('should be created', inject([AuthenticatonService], (service: AuthenticatonService) => {
    expect(service).toBeTruthy();
  }));
});
