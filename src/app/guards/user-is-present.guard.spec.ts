import { TestBed } from '@angular/core/testing';

import { UserIsPresentGuard } from './user-is-present.guard';

describe('UserIsPresentGuard', () => {
  let guard: UserIsPresentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserIsPresentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
