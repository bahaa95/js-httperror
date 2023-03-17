import { statusesInfo } from './statusesInfo';
import { ErrorStatus, Statuses } from './types';
import { objectValues } from '../utils/objectValues';

const successStatuses: Statuses = {
  Continue: 100,
  Switching_Protocols: 101,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  Non_Authoritative_Information: 203,
  No_Content: 204,
  Reset_Content: 205,
  Partial_Content: 206,
  Multiple_Choices: 300,
  Moved_Permanently: 301,
  Found: 302,
  See_Other: 303,
  Not_Modified: 304,
  unused: 306,
  Temporary_Redirect: 307,
  Permanent_Redirect: 308,
};

/**
 * http status codes >= 400
 *
 * @access private
 *
 * @example
 * ```ts
 * console.log(errorStatusess.Bad_Request); => 400
 * ```
 */
export const errorStatusess = objectValues(statusesInfo).reduce(
  (accumulator, status) => {
    return { ...accumulator, [status.name]: status.status };
  },
  {},
) as ErrorStatus;

/**
 * http status codes
 *
 * @access public
 *
 * @example
 * ```ts
 * console.log(statuses.Bad_Request); => 400
 * ```
 */
export const statuses = {
  ...successStatuses,
  ...errorStatusess,
};
