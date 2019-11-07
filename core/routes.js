
const ThingController = require('../controllers/thing-controller');
const ThingService = require('../services/thing-service');

module.exports = (app) => {
  const thingController = new ThingController(new ThingService());

  app.post(`/api/things`, thingController.insert);
  // app.put(`/api/thing/:id`, thingController.update);
}