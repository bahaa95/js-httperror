import { statuses, StatusCode } from '../../status';

/**
 * Check if the status code is valid http status.
 *
 * @private
 * @param status http status code.
 * @returns boolean
 */
export function isStatusValid(status: StatusCode): boolean {
  return Object.values(statuses).includes(status);
}
