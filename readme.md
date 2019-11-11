# Node.js API Starter Template
This is a starter template app for a generic REST API. It is written in Nodejs & Express, uses MongoDB at the backend and has a standard set of CRUD operations.

Features:
- Separation of controllers, services, models & routes
- [Mongoose](https://mongoosejs.com/) for MongoDB interaction
- Unit tests via Mocha, [SuperTest](https://www.npmjs.com/package/supertest) and [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)
- [Istanbul/nyc](https://www.npmjs.com/package/nyc) for code coverage
- Swagger auto generation & Swagger UI using [express-swagger-generator](https://www.npmjs.com/package/express-swagger-generator)
- A standard Dockerfile
- An example model/controller/service - called 'thing'

This repo can be cloned/copied to bootstrap new projects


# Project Structure
The project follows a fairly standard MVC style structure, except there are no views. This being an API, all data is returned as JSON

- `controllers/` - controllers, including base **Controller** class. HTTP interface layer
- `models/` - models, classes should initalize a Mogoose schema, and return instances of Mongoose models
- `services/` - services, carry out CRUD operations against the database via the models. Includes base **Service** class
- `core/` - main database connection and app routes

A **Service** wraps a single **Model**, and a **Controller** wraps a single **Service**

The base classes in `services/service.js` and `controllers/controller.js` contain implementations and methods for a standard CRUD style REST API. This means adding your own should require the minimum of code. See [usage and example](#example)

## Service Layer - Querying Models
Most methods (`insert`, `fetchOne`, `update`, `delete`) of the 'Service' class work against the database much as expected, the query method requires some explanation. The `query` method should be passed a HTTP request query object (i.e. `req.query`)

Three query URL parameters are supported, all are optional:
- `filter` - A query string passed to [mongoose-query-parser](https://www.npmjs.com/package/mongoose-query-parser), e.g. `foo=bar` or `name=ben%26score>=25`. This is effectively a nested query string, so URI encode any ampersands as %26 
- `limit` - Limit number of results returned
- `skip` - Skip a number of results, use for pagination

Note. omitting all params (i.e. no query string at all) results in documents of the given model being returned from the DB

URL examples:
- `/api/things?cheese=cheddar`
- `/api/things?name=ben%26score>=25&limit=5`
- `/api/things?skip=100&limit=50`

## Main Server / App Entrypoint
The app is started via `server.js` in the root of the project, which can be started with `node server.js` or `npm start`. 
The server is a fairly standard Express app, additional optional features include loading dotenv files, configuring logging (via morgan) and swagger auto generation.

The server will try to connect to MongoDB on startup, if it can't connect the app will terminate.

The `etc/server-minimal.js` file is an alternative version with all the optional sections removed, leaving bare minimum to start the app.


# Configuration
Configuration is done via environmental variables, the dotenv library is included and will load any `.env` file found, a sample env file is included for reference.

The following environmental variables are used:

| Variable | Description | Type | Default |
|----------|-------------|------|---------|
|PORT|Port to listen on for HTTP requests|integer|3000|
|MONGO_CONNSTR|MongoDB connection string URL [📘](https://docs.mongodb.com/manual/reference/connection-string/)|string|mongodb://localhost/|
|MONGO_CONNECT_TIMEOUT|Timeout when first connecting to MongoDB, in millisecs|integer|30000|

In place of `MONGO_CONNSTR` the variables `MONGO_CONNECTION` or `MONGO_URL` can also be used instead.
  
## Supplied NPM Scripts
- `npm start` - Start the app
- `npm run watch` - Start the app, listen to code changes and restart with nodemon
- `npm test` - Run Mocha unit tests
- `npm run test-html` - Run unit tests and output report in HTML format
- `npm run test-junit` - Run unit tests and output report in JUnit format
- `npm run coverage` - Generate code coverage report
- `npm run cleanup` - Cleanup output directories from unit tests/coverage

 
# Usage and 'Thing' Placeholder
The template comes with a 'thing' entity which simply serves as a placeholder and example for adding your own models, entities and APIs. 

To start using the template replicate the code in these files:
- `models/thing.js`
- `controllers/thing-controller.js`
- `services/thing-service.js`
- `test/api-thing.spec.js`

Copy, rename and edit these files to new names and change classes as required.  

### Example

A new Foo **Controller** in `controllers/foo-controller.js`
```js
class FooController extends Controller {
  constructor(service) { 
    super(service);
  }
}
```

A new Foo **Service** in `services/foo-service.js`
```js
class FooService extends Service {
  constructor() {
    const foo = new Foo().getInstance();
    super(foo);
  }
};
```

In `core/routes.js` add an instance of your new controller, e.g.
```js
const fooController = new FooController(new FooService());
```

And expose routes of that controller in `core/routes.js` as follows:
```js
app.get('/api/foo',        fooController.query);
app.get('/api/foo/:id',    fooController.get);
app.post('/api/foo',       fooController.create);
app.put('/api/foo/:id',    fooController.update);
app.delete('/api/foo/:id', fooController.delete);
```
