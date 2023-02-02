import { createHttpError } from '../httpError';
import { Options } from '../types';
import { statusesInfo } from '../../status';

describe('HttpError', () => {
  describe('create HttpError', () => {
    const HttpError = createHttpError();
    const error = new HttpError();

    it('should be an instance of HttpError', () => {
      expect(error).toBeInstanceOf(HttpError);
    });

    it('should be an instance of Error', () => {
      expect(error).toBeInstanceOf(Error);
    });

    it('should return an HttpError object', () => {
      expect(typeof error).toBe('object');
      expect(error).toHaveProperty('status');
      expect(error).toHaveProperty('name');
      expect(error).toHaveProperty('text');
      expect(error).toHaveProperty('message');
    });
  });

  describe('default options', () => {
    const HttpError = createHttpError();
    const error = new HttpError();

    it('should return status code', () => {
      expect(error.status).toBe(500);
    });

    it('should return name', () => {
      expect(error.name).toBe(statusesInfo[500].name);
    });

    it('should return text', () => {
      expect(error.text).toBe(statusesInfo[500].text);
    });

    it('should return message', () => {
      expect(error.message).toBe(statusesInfo[500].message);
    });
  });

  describe('change defualt options', () => {
    const HttpError = createHttpError();
    const error = new HttpError({
      status: 400,
      message: 'bad request error',
    });
    const { status, name, text } = statusesInfo[400];

    it('should return status code', () => {
      expect(error.status).toBe(status);
    });

    it('should return name', () => {
      expect(error.name).toBe(name);
    });

    it('should return text', () => {
      expect(error.text).toBe(text);
    });

    it('should return message', () => {
      expect(error.message).toBe('bad request error');
    });

    it('should return error with status 500 when passed invalid status code', () => {
      expect(new HttpError({ status: 480 as any }).status).toBe(500);
    });
  });

  describe('custom options (schema)', () => {
    interface Schema {
      feature?: 'posts';
      action: 'add' | 'delete';
      date: Date;
      expose?: boolean;
    }

    const HttpError = createHttpError<Schema>({
      feature: 'posts',
      expose: true,
    });
    const error = new HttpError({
      status: 500,
      action: 'delete',
      date: new Date(),
      expose: false,
    });

    it('should return the custom options', () => {
      expect(error.feature).toBe('posts');
      expect(error.action).toBe('delete');
      expect(error.date).toBeInstanceOf(Date);
      expect(error.expose).toBe(false);
    });
  });

  describe('api', () => {
    interface Schema {
      feature?: 'posts';
      action: 'add' | 'delete';
      senstiveInfo: {
        userId: string;
        email: string;
      };
    }

    const HttpError = createHttpError<Schema>({
      feature: 'posts',
    });

    const error = new HttpError({
      status: 404,
      action: 'delete',
      senstiveInfo: {
        userId: '12345678',
        email: 'user@example.com',
      },
    });

    describe('isValid method', () => {
      it('should return true when is valid HttpError', () => {
        expect(HttpError.isValid(error)).toBe(true);
      });

      it('should return false when is invalid HttpError', () => {
        expect(HttpError.isValid(new Error())).toBe(false);
        expect(HttpError.isValid({} as any)).toBe(false);
        expect(HttpError.isValid('error' as any)).toBe(false);
        //@ts-ignore
        expect(HttpError.isValid()).toBe(false);
        //@ts-ignore
        expect(HttpError.isValid(undefined)).toBe(false);
      });
    });

    describe('toClient method', () => {
      const err = error.toClient();
      it('should return only defualt HttpError options', () => {
        expect(err).toHaveProperty('status');
        expect(err).toHaveProperty('name');
        expect(err).toHaveProperty('text');
        expect(err).toHaveProperty('message');
        expect(err).not.toHaveProperty('feature');
        expect(err).not.toHaveProperty('action');
        expect(err).not.toHaveProperty('senstiveInfo');
      });
    });
  });

  describe('custom HttpError class (extend HttpError)', () => {
    interface Schema {
      action: 'add' | 'delete' | 'edit';
    }
    const HttpError = createHttpError<Schema>();
    type HttpErrorOptions = Options<Schema>;

    //custom HttpError class options
    interface CustomHttpErrorOptions {
      status?: HttpErrorOptions['status'];
      message?: HttpErrorOptions['message'];
      action: HttpErrorOptions['action'];
      expose?: boolean;
    }

    //custom HttpError class
    class CustomHttpError extends HttpError {
      public readonly expose: boolean;

      constructor(options: CustomHttpErrorOptions) {
        super({
          status: options.status,
          message: options.message,
          action: options.action,
        });
        this.expose = options.expose || this.status < 500;
        Object.setPrototypeOf(this, CustomHttpError.prototype);
      }

      log(): void {
        console.log(this);
      }
    }

    const customHttpError = new CustomHttpError({
      status: 400,
      action: 'add',
    });

    it('should extend HttpError class', () => {
      expect(customHttpError).toBeInstanceOf(CustomHttpError);
      expect(customHttpError).toBeInstanceOf(HttpError);
      expect(customHttpError).toBeInstanceOf(Error);
    });

    it('should extend HttpError options', () => {
      expect(customHttpError).toHaveProperty('status');
      expect(customHttpError).toHaveProperty('name');
      expect(customHttpError).toHaveProperty('text');
      expect(customHttpError).toHaveProperty('message');
      expect(customHttpError).toHaveProperty('action');
    });

    it('should be valid HttpError', () => {
      expect(HttpError.isValid(customHttpError)).toBe(true);
    });

    it('should have its own options', () => {
      expect(customHttpError).toHaveProperty('expose');
    });
  });
});
