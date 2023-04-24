import { ErrorStatusCode, ErrorStatusName } from '../status';

type CombineTypes<T1, T2> = T1 & T2;

type DefaultOptions = {
  status?: ErrorStatusCode;
  message?: string;
};

type CustomOptions<T> = T;

export type Options<T> = CombineTypes<DefaultOptions, CustomOptions<T>>;

export type HttpErrorObject<T> = HttpError<
  CombineTypes<Required<DefaultOptions>, CustomOptions<T>>
>;

export type Constructor<T extends object> = {
  new (options?: Options<T>): HttpErrorObject<T>;

  /**
   * Check if the given error is valid HttpError.
   *
   * @access public
   * @param error - error object.
   * @returns boolean.
   */
  /* tslint:disable */
  isValid: <T extends Error>(error: T) => boolean;
};

export type Schema<T> = Omit<Partial<Options<T>>, 'message'>;

export type HttpError<T> = Omit<Error, 'message'> &
  T & {
    // properties
    name: ErrorStatusName;
    text: string;

    // methods
    /**
     * Return HttpError object with {status,name,text,message} properties
     *
     * @access public
     * @return {object} error object with properties {status,name,text,message}.
     *
     * @example
     * ```ts
     * const error = new HttpError({
     * status:404,
     * message:'Post not found',
     * details:'cant found post with id=1234',
     * userId:'12',
     * userAgent:'user agent'
     * })
     *
     * console.log(error.toClient())
     *  => {
     * status:404,
     * name:'Not_Found',
     * text:'Not Found',
     * message:'Post not found',
     * }
     * ```
     */
    toClient: () => ClientError<T>;
  };

export type ClientError<T> = Pick<
  HttpErrorObject<T>,
  'status' | 'name' | 'text' | 'message'
>;

export type Hydrate<T> = HttpErrorObject<T>;
