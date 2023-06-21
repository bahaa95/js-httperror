import { objectValues } from '../utils/objectValues';

export type InformationalStatuses = Record<'Continue', 100> &
  Record<'Switching_Protocols', 101>;

export type SuccessStatuses = Record<'Ok', 200> &
  Record<'Created', 201> &
  Record<'Accepted', 202> &
  Record<'Non_Authoritative_Information', 203> &
  Record<'No_Content', 204> &
  Record<'Reset_Content', 205> &
  Record<'Partial_Content', 206>;

export type RedirectStatuses = Record<'Multiple_Choices', 300> &
  Record<'Moved_Permanently', 301> &
  Record<'Found', 302> &
  Record<'See_Other', 303> &
  Record<'Not_Modified', 304> &
  Record<'unused', 306> &
  Record<'Temporary_Redirect', 307> &
  Record<'Permanent_Redirect', 308>;

export type ErrorStatusCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

export type ErrorStatusName =
  | 'Bad_Request'
  | 'Unauthorized'
  | 'Payment_Required'
  | 'Forbidden'
  | 'Not_Found'
  | 'Method_Not_Allowed'
  | 'Not_Acceptable'
  | 'Proxy_Authentication_Required'
  | 'Request_Timeout'
  | 'Conflict'
  | 'Gone'
  | 'Length_Required'
  | 'Precondition_Failed'
  | 'Payload_Too_Large'
  | 'URI_Too_Long'
  | 'Unsupported_Media_Type'
  | 'Range_Not_Satisfiable'
  | 'Expectation_Failed'
  | 'Im_a_Teapot'
  | 'Too_Early'
  | 'Upgrade_Required'
  | 'Precondition_Required'
  | 'Too_Many_Requests'
  | 'Request_Header_Fields_Too_Large'
  | 'Unavailable_For_Legal_Reasons'
  | 'Internal_Server_Error'
  | 'Not_Implemented'
  | 'Bad_Gateway'
  | 'Service_Unavailable'
  | 'Gateway_Timeout'
  | 'HTTP_Version_Not_Supported'
  | 'Variant_Also_Negotiates'
  | 'Insufficient_Storage'
  | 'Loop_Detected'
  | 'Not_Extended'
  | 'Network_Authentication_Required';

export type ErrorStatuses = Record<ErrorStatusName, ErrorStatusCode>;

export type StatusInfo = Record<
  ErrorStatusCode,
  {
    status: ErrorStatusCode;
    name: ErrorStatusName;
    text: string;
    message: string;
  }
>;

/**
 * Info for each status code
 *
 * @access private
 */
export const statusesInfo: StatusInfo = {
  400: {
    status: 400,
    name: 'Bad_Request',
    text: 'Bad Request',
    message: 'The request cannot be fulfilled due to bad syntax',
  },
  401: {
    status: 401,
    name: 'Unauthorized',
    text: 'Unauthorized',
    message:
      'The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided',
  },
  402: {
    status: 402,
    name: 'Payment_Required',
    text: 'Payment Required',
    message: 'Reserved for future use',
  },
  403: {
    status: 403,
    name: 'Forbidden',
    text: 'Forbidden',
    message:
      'The request was a legal request, but the server is refusing to respond to it',
  },
  404: {
    status: 404,
    name: 'Not_Found',
    text: 'Not Found',
    message:
      'The requested page could not be found but may be available again in the future',
  },
  405: {
    status: 405,
    name: 'Method_Not_Allowed',
    text: 'Method Not Allowed',
    message:
      'A request was made of a page using a request method not supported by that page',
  },
  406: {
    status: 406,
    name: 'Not_Acceptable',
    text: 'Not Acceptable',
    message:
      'The server can only generate a response that is not accepted by the client',
  },
  407: {
    status: 407,
    name: 'Proxy_Authentication_Required',
    text: 'Proxy Authentication Required',
    message: 'The client must first authenticate itself with the proxy',
  },
  408: {
    status: 408,
    name: 'Request_Timeout',
    text: 'Request Timeout',
    message: 'The server timed out waiting for the request',
  },
  409: {
    status: 409,
    name: 'Conflict',
    text: 'Conflict',
    message:
      'The request could not be completed because of a conflict in the request',
  },
  410: {
    status: 410,
    name: 'Gone',
    text: 'Gone',
    message: 'The requested page is no longer available',
  },
  411: {
    status: 411,
    name: 'Length_Required',
    text: 'Length Required',
    message:
      'The "Content-Length" is not defined. The server will not accept the request without it ',
  },
  412: {
    status: 412,
    name: 'Precondition_Failed',
    text: 'Precondition Failed',
    message:
      'The precondition given in the request evaluated to false by the server',
  },
  413: {
    status: 413,
    name: 'Payload_Too_Large',
    text: 'Payload Too Large',
    message:
      'The server will not accept the request, because the request entity is too large',
  },
  414: {
    status: 414,
    name: 'URI_Too_Long',
    text: 'URI Too Long',
    message:
      'The server will not accept the request, because the URI is too long. Occurs when you convert a POST request to a GET request with a long query information ',
  },
  415: {
    status: 415,
    name: 'Unsupported_Media_Type',
    text: 'Unsupported Media Type',
    message:
      'The server will not accept the request, because the media type is not supported ',
  },
  416: {
    status: 416,
    name: 'Range_Not_Satisfiable',
    text: 'Range Not Satisfiable',
    message:
      'The client has asked for a portion of the file, but the server cannot supply that portion',
  },
  417: {
    status: 417,
    name: 'Expectation_Failed',
    text: 'Expectation Failed',
    message:
      'The server cannot meet the requirements of the Expect request-header field',
  },
  418: {
    status: 418,
    name: 'Im_a_Teapot',
    text: 'Im a Teapot',
    message: 'The server refuses the attempt to brew coffee with a teapot',
  },
  425: {
    status: 425,
    name: 'Too_Early',
    text: 'Too Early',
    message:
      'The server is unwilling to risk processing a request that might be replayed',
  },
  426: {
    status: 426,
    name: 'Upgrade_Required',
    text: 'Upgrade Required',
    message:
      'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol',
  },
  428: {
    status: 428,
    name: 'Precondition_Required',
    text: 'Precondition Required',
    message: 'The origin server requires the request to be conditional',
  },
  429: {
    status: 429,
    name: 'Too_Many_Requests',
    text: 'Too Many Requests',
    message: 'The user has sent too many requests',
  },
  431: {
    status: 431,
    name: 'Request_Header_Fields_Too_Large',
    text: 'Request Header Fields Too Large',
    message:
      ' The server is not willing to process the request because its header fields are indeed too large',
  },
  451: {
    status: 451,
    name: 'Unavailable_For_Legal_Reasons',
    text: 'Unavailable For Legal Reasons',
    message: 'The user has requested an illegal resource',
  },
  500: {
    status: 500,
    name: 'Internal_Server_Error',
    text: 'Internal Server Error',
    message: 'Internal server error',
  },
  501: {
    status: 501,
    name: 'Not_Implemented',
    text: 'Not Implemented',
    message:
      'The server either does not recognize the request method, or it lacks the ability to fulfill the request',
  },
  502: {
    status: 502,
    name: 'Bad_Gateway',
    text: 'Bad Gateway',
    message:
      'The server was acting as a gateway or proxy and received an invalid response from the upstream server',
  },
  503: {
    status: 503,
    name: 'Service_Unavailable',
    text: 'Service Unavailable',
    message: 'The server is currently unavailable',
  },
  504: {
    status: 504,
    name: 'Gateway_Timeout',
    text: 'Gateway Timeout',
    message:
      'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server',
  },
  505: {
    status: 505,
    name: 'HTTP_Version_Not_Supported',
    text: 'HTTP Version Not Supported',
    message:
      'The server does not support the HTTP protocol version used in the request',
  },
  506: {
    status: 506,
    name: 'Variant_Also_Negotiates',
    text: 'Variant Also Negotiates',
    message: 'The server has an internal configuration error',
  },
  507: {
    status: 507,
    name: 'Insufficient_Storage',
    text: 'Insufficient Storage',
    message:
      'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request',
  },
  508: {
    status: 508,
    name: 'Loop_Detected',
    text: 'Loop Detected',
    message:
      'The server detected an infinite loop while processing the request',
  },
  510: {
    status: 510,
    name: 'Not_Extended',
    text: 'Not Extended',
    message:
      'Further extensions to the request are required for the server to fulfill it',
  },
  511: {
    status: 511,
    name: 'Network_Authentication_Required',
    text: 'Network Authentication Required',
    message: 'The client needs to authenticate to gain network access',
  },
};

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
