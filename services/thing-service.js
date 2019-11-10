const Service = require('./service')
const Thing = require('../models/thing');

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ! PLACEHOLDER CODE - REMOVE / REPLACE THIS !
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//
// Simple demo 'thing' service, has no special implementation 
//
class ThingService extends Service {
  constructor() {
    // Get an instance of the Thing model
    const thing = new Thing().getInstance();
    // Pass it to the superclass
    super(thing);
    
    // That's it!
  }
};

module.exports = ThingService;