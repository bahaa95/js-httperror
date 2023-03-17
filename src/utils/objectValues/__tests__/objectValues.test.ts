import { objectValues } from '../index';

describe('ObjectValues function', () => {
  it('should return an array', () => {
    const values = objectValues({ x: 1, y: 2 });
    expect(values).toHaveProperty('length');
  });

  it('should return object values in an array', () => {
    expect(objectValues({ x: 1, y: 2 })).toEqual([1, 2]);
    expect(objectValues({ 1: 'one', 2: 'two' })).toEqual(['one', 'two']);
  });

  it('should return an empty array if pass invalid object', () => {
    //@ts-ignore
    expect(objectValues('invalid object')).toEqual([]);
    //@ts-ignore
    expect(objectValues(undefined)).toEqual([]);
    //@ts-ignore
    expect(objectValues(1)).toEqual([]);
    //@ts-ignore
    expect(objectValues([])).toEqual([]);
  });
});
