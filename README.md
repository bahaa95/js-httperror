# ts-httperror

Create Http errors with custom schema for nodejs, express, etc(also work for javascript in browsers). 



[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Installation

Install ts-httperror with npm.

```bash
  npm install ts-httperror
```
    
## Usage
**_NOTE:_** All code is written with typescript. It's work the same for javascript just remove the types(interfaces, types).

create simple httperror.
```typescript
import createHttpError from 'ts-httperror'

// use createHttpError function to create HttpError class
const HttpError = createHttpError();

// create HttpError object
const error = new HttpError({ status: 404, message: 'Blog not found.' });
console.log(error);
/**
 * Not_Found: Blog not found.
 * at new HttpError (user:\Programing\Wep\ts-httperror\test.js:56:32)
 * at Module._extensions..js (node:internal/modules/cjs/loader:1272:10)
 * ...
 * {
 *  status :404,
 * text:'Not Found'
 * }
 */

// or you can throw it immediately
throw new HttpError({ status: 404, message: 'Blog not found.' });
```

### HttpError constructor options
HttpError constructor has argument options with properties
- `status` - the status code for error default is `500`. We can also change the defualt status code from `500` to any status code. We will se this soon.
- `message` - error message defualt is message for the status code.

```typescript
import createHttpError from 'ts-httperror';

const HttpError = createHttpError();

const error1 = new HttpError();
console.log(error1.status); // => 500
console.log(error1.message); // => Internal server error

const error2 = new HttpError({ status: 404 });
console.log(error2.status); // => 404
console.log(error2.message);
/**
 *  => The requested page could not be found but may be a
 *     vailable again in the future
 */

const error3 = new HttpError({ status: 400, message: 'Validation failed' });
console.log(error3.status); // => 400
console.log(error3.message); // => Validation failed
```

Change the defualt status from 500 to any other status. To do that just add the status option to createHttpError function.

```typescript
import createHttpError from 'ts-httperror';
const HttpError = createHttpError({
    // change the default status from 500 to 400
    status: 400,
});

const error = new HttpError();
console.log(error.status); // => 400
console.log(error.message) // => The request cannot be fulfilled due to bad syntax

```

### Create custom HttpError schema
Create custom schema for the HttpError.

```typescript
import createHttpError from 'ts-httperror';

//create your schema interface
interface Schema {
    date: Date;
    public?: boolean;
}

const HttpError = createHttpError<Schema>({
    // add default values for your schema
    public: true,
});

const error1 = new HttpError({
    status: 404,
    message: 'Blog not found',
    date: new Date('2020-01-01'),
});
console.log(error1.date); // => 2020-01-01T00:00:00.000Z
console.log(error1.public); // => true

const error2 = new HttpError({
    status: 400,
    date: new Date('2020-01-01'),
    public: false,
});
console.log(error2.date); // => 2020-01-01T00:00:00.000Z
console.log(error2.public); // => false
```

Create a custom schema for every feature in the app
```typescript
// user/users.ts
import createHttpError from 'ts-httperror';

interface Schema {
    feature?: 'users';
    action: 'add' | 'update' | 'delete';
}

const HttpError = createHttpError<Schema>({
    // add default values for your schema
    feature: 'users',
});

const error = new HttpError({ status: 400, action: 'add' });
console.log(error.feature); // => 'users'
console.log(error.action); // => 'add'
```

```typescript
// blog/blog.ts
import createHttpError from 'ts-httperror';

interface Schema {
    feature?: 'blog';
    action: 'add' | 'update' | 'delete';
}

const HttpError = createHttpError<Schema>({
    // add default values for your schema
    feature: 'blog',
});

const error = new HttpError({ status: 404, action: 'delete' });
console.log(error.feature); // => 'blog'
console.log(error.action); // => 'delete'
```

### Api
- `isValid` - A static method use to check if given error is valid HttpError.

```typescript
import createHttpError from 'ts-httperror';

const HttpError = createHttpError();

console.log(HttpError.isValid(new HttpError())); // => true
console.log(HttpError.isValid(new Error())); // => false
```

- `toClient` - method use to return only HttpError defualt options without custom options (custom schema).

```typescript
import createHttpError from 'ts-httperror';

interface Schema {
    feature?: 'blog';
    details: string;
    userId?: string;
    userAgent?: string;
    action: 'add' | 'update' | 'delete';
}

const HttpError = createHttpError<Schema>({
    feature: 'blog',
});

const error = new HttpError({
    status: 404,
    action: 'delete',
    message: 'Blog not found',
    details: 'Blog with id=1234 not found',
    userId: '123',
    userAgent: '...',
});

console.log(error.toClient());
/**
 * {
 *  status:404,
 *  name:'Not_Found',
 *  text:'Not Found',
 *  message:'Blog not found'
 * }
 */
```

### Custom HttpError Class
Create custom HttpError class with your own properites and methods by extends the HttpError class.
```typescript
import createHttpError, { Options } from 'ts-httperror';

// create your schema for HttpError
interface Schema {
    date: Date;
}

// create HttpError class with your schema
const HttpError = createHttpError<Schema>();

// create type for options in HttpError constructor
type HttpErrorOptions = Options<Schema>;

/**
 * create type for options in CustomHttpError constructor and
 *  make it extends the HttpErroroptions
 */
type CustomHttpErrorOptions = HttpErrorOptions & {
    expose?: boolean;
};

/**
 * create CustomHttpError class and make it extend the HttpError class
 */
class CustomHttpError extends HttpError {
    public readonly expose: boolean;

    constructor({ expose, ...httpErrorOptions }: CustomHttpErrorOptions) {
        // send HttpError constructor options (status,message, etc) to HttpError class
        super(httpErrorOptions);
        this.expose = expose || this.status < 500;
    }

    public log = (): void => {
        console.log(this);
    }
}

const error = new CustomHttpError({
    status: 400,
    message: 'some error occurred',
    date: new Date('2020-01-01'),
    expose:true
});

console.log(HttpError.isValid(error)); // => true

console.log(error.status); // => 400
console.log(error.expose); // => true

error.log(); // will log the error
error.toClient(); // also work
```

### Other features
Get options type in HttpError constructor.
```typescript
import createHttpError, { Options } from 'ts-httperror';

interface Schema {
    date?: Date;
}

const HttpError = createHttpError<Schema>();

type HttpErrorOptions = Options<Schema>;

const options: HttpErrorOptions = {
    status: 404,
    date: new Date(),
};

const error = new HttpError(options);
```

Get type for HttpError object by using Hydrate.

```typescript
import createHttpError, { Hydrate } from 'ts-httperror';

interface Schema {
    date?: Date;
}

const HttpError = createHttpError<Schema>();

// return type for HttpError object
type HttpErrorObject = Hydrate<Schema>;

const error = new HttpError();

function logError(error: HttpErrorObject) {
    console.log(error);
}

logError(error);
```

increase the readability to the error by using statuses
```typescript
import createHttpError, { statuses } from 'ts-httperror';

const HttpError = createHttpError();

new HttpError({ status: statuses.Bad_Request });
// same to => new HttpError({ status: 400 });
```