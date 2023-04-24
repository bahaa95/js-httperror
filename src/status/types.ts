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
