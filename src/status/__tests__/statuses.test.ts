import { statuses } from '../statuses';

describe('statuses', () => {
  it('should return status code', () => {
    expect(statuses.Not_Found).toBe(404);
  });
});
