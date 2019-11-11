
const ThingController = require('../controllers/thing-controller');
const ThingService = require('../services/thing-service');
const HealthController = require('../controllers/health-controller');

//
// This function is called by server.js and sets up all routes
//
module.exports = (app) => {
  // Set up new ThingController wrapping a ThingService
  const thingController = new ThingController(new ThingService());
  // Health controller has no model
  const healthController = new HealthController(null);
  
  //
  // Change routes for different models as you see fit
  //

  // POST - Create a new thing
  app.post('/api/things',       thingController.create);

  // GET - a single thing
  app.get('/api/things/:id',    thingController.get);

  // GET - Query multiple things, URL query string optional
  app.get('/api/things',        thingController.query);

  // PUT - Update/replace a single thing
  app.put('/api/things/:id',    thingController.update);

  // DELETE - Remove a thing
  app.delete('/api/things/:id', thingController.delete);

  // Health and info endpoints
  // Remove if you don't want it
  app.get(['/api/health(z)?', '/api/info'],  healthController.get)
}