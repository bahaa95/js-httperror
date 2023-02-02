import { StatusCode, StatusName } from '../status';

type CombineTypes<T1, T2> = T1 & T2;

type DefaultOptions = {
  status?: StatusCode;
  message?: string;
};

type CustomOptions<T> = T;

export type Options<T> = CombineTypes<DefaultOptions, CustomOptions<T>>;

export type HttpErrorObject<T> = HttpError<
  CombineTypes<Required<DefaultOptions>, CustomOptions<T>>
>;

export type Constructor<T extends object> = {
  new (options?: Options<T>): HttpErrorObject<T>;
  isValid: <T extends Error>(error: T) => boolean;
};

export type Schema<T> = Omit<Partial<Options<T>>, 'message'>;

export type HttpError<T> = Omit<Error, 'message'> &
  T & {
    // properties
    name: StatusName;
    text: string;

    // methods
    toClient: () => ClientError<T>;
  };

export type ClientError<T> = Pick<
  HttpErrorObject<T>,
  'status' | 'name' | 'text' | 'message'
>;

export type Hydrate<T> = HttpErrorObject<T>;
