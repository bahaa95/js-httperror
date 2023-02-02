import { StatusCode, StatusName, statuses, statusesInfo } from '../status';
import { Constructor, Schema, Options, ClientError } from './types';
import { isStatusValid } from '../utils/isStatusValid';

/**
 * Create HttpError class with given schema.
 *
 * @public
 * @param schema custom error schema.
 * @returns HttpError class.
 */
export function createHttpError<T extends object>(
  schema: Schema<T> = {} as Schema<T>,
) {
  return class HttpError extends Error {
    public readonly status: StatusCode;
    public readonly name: StatusName;
    public readonly text: string;
    public readonly message: string;

    constructor(options: Options<T> = {} as Options<T>) {
      super();
      const { status, message, ...otherOptions } = options;

      this.status =
        status && isStatusValid(status)
          ? status
          : schema.status || statuses.Internal_Server_Error;
      this.name = statusesInfo[this.status].name;
      this.text = statusesInfo[this.status].text;
      this.message = message || statusesInfo[this.status].message;

      Object.assign(this, {
        ...schema,
        ...otherOptions,
      });
      Object.setPrototypeOf(this, HttpError.prototype);
    }

    /**
     * Check if the given error is valid HttpError.
     *
     * @public
     * @param error - error object.
     * @returns boolean.
     */
    public static isValid<T extends Error>(error: T): boolean {
      if (!error) return false;

      const isNameExists = Object.keys(statuses).includes(error.name);
      return (
        error instanceof HttpError &&
        isNameExists &&
        typeof error.status === 'number'
      );
    }

    /**
     * Return HttpError object with {status,name,text,message} properties
     *
     * @public
     * @return {object} error object with properties {status,name,text,message}.
     *
     * Basic usage example:
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
