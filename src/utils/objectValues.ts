/**
 * Returns an array of values of the object .
 *
 * @access private
 * @param obj object.
 * @returns array
 */
export function objectValues<T>(obj: { [s: string]: T }): T[] {
  if (!obj || typeof obj !== 'object' || obj === undefined) {
    return [];
  }

  const values = [] as T[];
  /* tslint:disable */
  for (const key in obj) {
    values.push(obj[key]);
  }

  return values;
}
