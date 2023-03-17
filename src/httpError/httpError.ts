import {
  ErrorStatusCode,
  ErrorStatusName,
  errorStatusess,
  statusesInfo,
} from '../status';
import { Constructor, Schema, Options, ClientError } from './types';
import { isStatusValid } from '../utils/isStatusValid';

/**
 * Create HttpError class with given schema.
 *
 * @access public
 * @param schema defualt values for custom error schema.
 * @returns HttpError class.
 */
export function createHttpError<T extends object>(
  schema: Schema<T> = {} as Schema<T>,
) {
  return class HttpError extends Error {
    public readonly status: ErrorStatusCode;
    public readonly name: ErrorStatusName;
    public readonly text: string;
    public readonly message: string;

    constructor(options: Options<T> = {} as Options<T>) {
      super();
      const { status, message, ...otherOptions } = options;

      this.status =
        status && isStatusValid(status)
          ? status
          : schema.status || errorStatusess.Internal_Server_Error;
      this.name = statusesInfo[this.status].name;
      this.text = statusesInfo[this.status].text;
      this.message =
        message && typeof message === 'string'
          ? message
          : statusesInfo[this.status].message;

      Object.assign(this, {
        ...schema,
        ...otherOptions,
      });
      Object.setPrototypeOf(this, HttpError.prototype);
    }

    /**
     * Check if the given error is valid HttpError.
     *
     * @access public
     * @param error - error object.
     * @returns boolean.
     */
    /* tslint:disable */
    public static isValid<T extends Error>(error: T): boolean {
      if (!error) return false;

      const isNameExists = Object.keys(errorStatusess).includes(error.name);
      return (
        error instanceof HttpError &&
        isNameExists &&
        typeof error.status === 'number'
      );
    }

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
    public toClient() {
      const { status, name, text, message } = this;
      return { status, name, text, message } as ClientError<T>;
    }
  } as unknown as Constructor<T>;
}
