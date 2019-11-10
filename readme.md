# Node.js API Starter Template
This is a starter template app for a generic REST API. It is written in Nodejs & Express, uses MongoDB at the backend and has a standard set of CRUD operations.

Features:
- Separations of controllers, services, models & routes
- Mongoose for MongoDB interaction
- Unit tests via SuperTest and mongodb-memory-server
- NYC for code coverage
- Swagger auto generation & Swagger UI
- A standard Dockerfile
- An example model/controller/service - called 'thing'


This repo can be cloned/copied to bootstrap new projects

# Project Structure
The project follows a fairly standard structure

# Configuration

# Querying Models

# Usage
Use the `thing` entity as a template for adding your own models, entities and APIs. These files are:
- `models/thing.js`
- `controllers/thing-controller.js`
- `service/thing-service.js`
- `test`/api-thing.spec.js`

Copy, rename and edit these files to new names and new classes as required.  
Once done edit `core/routes.js` add an instance of your new controller as follows
```js
const fooController = new FooController(new FooService());
```

```js
app.get('/api/foo/:id',    fooController.get);
```
