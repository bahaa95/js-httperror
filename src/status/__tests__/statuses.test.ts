import { statuses, errorStatusess } from '../statuses';

describe('statuses', () => {
  it('should return status code', () => {
    expect(statuses.Not_Found).toBe(404);
    expect(statuses.Ok).toBe(200);
    expect(statuses.Continue).toBe(100);
    expect(statuses.Temporary_Redirect).toBe(307);
    expect(statuses.Internal_Server_Error).toBe(500);
    expect(errorStatusess.Unauthorized).toBe(401);
    expect(errorStatusess.Bad_Request).toBe(400);
  });
});
