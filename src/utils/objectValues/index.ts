/**
 * Returns an array of values of the object .
 *
 * @private
 * @param obj object.
 * @returns array
 */
export function objectValues<T>(obj: { [s: string]: T }): T[] {
  if (!obj || obj.length || typeof obj !== 'object') {
    return [];
  }

  const values = [] as T[];
  for (let key in obj) {
    values.push(obj[key]);
  }

  return values;
}
