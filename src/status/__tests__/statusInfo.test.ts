import { statusesInfo } from '../statusesInfo';

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
      expect(statusesInfo[400].message).toBe('The request cannot be fulfilled due to bad syntax');
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
      expect(statusesInfo['400'].message).toBe('The request cannot be fulfilled due to bad syntax');
    });
  });
});
