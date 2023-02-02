import { isStatusValid } from '../index';

describe('isStatusValid function', () => {
  it('should return true if status is valid', () => {
    expect(isStatusValid(401)).toBe(true);
  });

  it('should return false if status is invalid', () => {
    expect(isStatusValid(600 as any)).toBe(false);
  });
});
