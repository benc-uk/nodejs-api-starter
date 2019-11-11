# Node.js API Starter Template
This is a starter template app for a generic REST API. It is written in Nodejs & Express, uses MongoDB at the backend and has a standard set of CRUD operations.

Features:
- Separation of controllers, services, models & routes
- [Mongoose](https://mongoosejs.com/) for MongoDB interaction
- Unit tests via [SuperTest](https://www.npmjs.com/package/supertest) and [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)
- [Istanbul/nyc](https://www.npmjs.com/package/nyc) for code coverage
- Swagger auto generation & Swagger UI using [express-swagger-generator](https://www.npmjs.com/package/express-swagger-generator)
- A standard Dockerfile
- An example model/controller/service - called 'thing'

This repo can be cloned/copied to bootstrap new projects

# Project Structure
The project follows a fairly standard structure,
- `controllers/` - controllers, including base **Controller** class. HTTP interface layer
- `models/` - models, creates instances of Mongoose models
- `services/` - services, carry out CRUD operations against the database via the models. Includes base **Service** class
- `core/` - main database connection and app routes

# Configuration

# Querying Models
All most methods (`insert`, `fetchOne`, `update`, `delete`) of the 'Service' class work against the database much as expected, the query method requires some explanation. The `query` method should be passed a HTTP request query object (i.e. `req.query`)

Three query URL parameters are supported:
- `filter` - A query string passed to [mongoose-query-parser](https://www.npmjs.com/package/mongoose-query-parser), e.g. `foo=bar` or `name=ben%26score>=25` as this is effectively a nested query string, URI encode any ampersands as %26 
- `limit` - Limit number of results returned
- `skip` - Skip results, for pagination

Note. omitting all params (i.e. no query string at all) results in all models being returned from the DB

URL examples:
- `/api/things?cheese=cheddar`
- `/api/things?name=ben%26score>=25&limit=5`
- `/api/things?skip=100&limit=50`
 
# Usage and 'Thing' Placeholder
The template comes with a 'thing' entity as a placeholder and example for adding your own models, entities and APIs. 

To start using the template replicate the code in these files:
- `models/thing.js`
- `controllers/thing-controller.js`
- `service/thing-service.js`
- `test/api-thing.spec.js`

Copy, rename and edit these files to new names and change classes as required.  

Once done edit `core/routes.js` add an instance of your new controller, e.g.
```js
const fooController = new FooController(new FooService());
```

And add routes as follows:
```js
app.get('/api/foo/:id', fooController.get);
```
