import { TestBed } from '@angular/core/testing';

import { UserRepository } from '../repositories/user.repository';

describe('UserService', () => {
  let service: UserRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
