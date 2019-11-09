
const ThingController = require('../controllers/thing-controller');
const ThingService = require('../services/thing-service');
const HealthController = require('../controllers/health-controller');

module.exports = (app) => {
  const thingController = new ThingController(new ThingService());
  const healthController = new HealthController(null);

  app.post('/api/things',       thingController.insert);
  app.get('/api/things/:id',    thingController.get);
  app.get('/api/things',        thingController.get);
  app.put('/api/things/:id',    thingController.update);
  app.delete('/api/things/:id', thingController.delete);

  // Health and info endpoints
  app.get(['/api/health(z)?', '/api/info'],  healthController.get)
}