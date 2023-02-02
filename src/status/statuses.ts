import { statusesInfo } from './statusesInfo';
import { Status } from './types';

/**
 * http status codes
 *
 * @public
 *
 * * basic usage example
 * ```ts
 * console.log(statuses.Bad_Request); => 400
 * ```
 */
export const statuses = Object.values(statusesInfo).reduce(
  (accumulator, status) => {
    return { ...accumulator, [status.name]: status.status };
  },
  {},
) as Status;
