import { statusesInfo } from './statusesInfo';
import {
  ErrorStatuses,
  InformationalStatuses,
  SuccessStatuses,
  RedirectStatuses,
} from './types';
import { objectValues } from '../utils/objectValues';

/**
 * informational statuses
 * @access private
 */
const informationalStatuses: InformationalStatuses = {
  Continue: 100,
  Switching_Protocols: 101,
};

/**
 * success statuses
 * @access private
 */
const successStatuses: SuccessStatuses = {
  Ok: 200,
  Created: 201,
  Accepted: 202,
  Non_Authoritative_Information: 203,
  No_Content: 204,
  Reset_Content: 205,
  Partial_Content: 206,
};

/**
 * redirect statuses
 * @access private
 */
const redirectStatuses: RedirectStatuses = {
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
) as ErrorStatuses;

/**
 * http status codes
 *
 * @access public
 *
 * @example
 * ```ts
 * console.log(statuses.Ok); => 200
 * console.log(statuses.Bad_Request); => 400
 * ```
 */
export const statuses = {
  ...informationalStatuses,
  ...successStatuses,
  ...redirectStatuses,
  ...errorStatusess,
};

export type Statuses = typeof statuses;
