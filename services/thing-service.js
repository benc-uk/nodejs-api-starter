const Service = require('./service')
const Thing = require('../models/thing');

class ThingService extends Service {
  constructor() {
    const thing = new Thing().getInstance();
    super(thing);
  }
};

module.exports = ThingService;