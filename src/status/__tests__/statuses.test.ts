import { statuses, errorStatusess, statusesInfo } from '..';

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

describe('statusesInfo', () => {
  describe('statusesInfo[400]', () => {
    it('should return a statusesInfo object', () => {
      expect(typeof statusesInfo[400]).toBe('object');
    });

    it('should return a status code', () => {
      expect(statusesInfo[400].status).toBe(400);
    });

    it('should return a status name', () => {
      expect(statusesInfo[400].name).toBe('Bad_Request');
    });

    it('should return a status text', () => {
      expect(statusesInfo[400].text).toBe('Bad Request');
    });

    it('should return a status message', () => {
      expect(statusesInfo[400].message).toBe(
        'The request cannot be fulfilled due to bad syntax',
      );
    });
  });

  describe("statusesInfo['400']", () => {
    it('should return a statusesInfo object', () => {
      expect(typeof statusesInfo['400']).toBe('object');
    });

    it('should return a status code', () => {
      expect(statusesInfo['400'].status).toBe(400);
    });

    it('should return a status name', () => {
      expect(statusesInfo['400'].name).toBe('Bad_Request');
    });

    it('should return a status text', () => {
      expect(statusesInfo['400'].text).toBe('Bad Request');
    });

    it('should return a status message', () => {
      expect(statusesInfo['400'].message).toBe(
        'The request cannot be fulfilled due to bad syntax',
      );
    });
  });
});
