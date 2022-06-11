import { TestBed } from '@angular/core/testing';

import { ManagerPartnersService } from './manager-partners.service';

describe('ManagerPartnersService', () => {
  let service: ManagerPartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerPartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
