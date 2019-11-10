const Controller = require('./controller');

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ! PLACEHOLDER CODE - REMOVE / REPLACE THIS !
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//
// ThingController has no implementation of it's own
//
class ThingController extends Controller {
  constructor(service) { 
    super(service);
  }

  // Comments are only here for express-swagger-generator

  /**
   * @route GET /api/things/{id}
   * @group things - Operations on things
   * @param {string} id.path.required - id
   * @returns {Thing} 200 - A single Thing object
   * @returns {Error}  default - Unexpected error
   */
   
  /**
   * @route GET /api/things
   * @group things - Operations on things
   * @param {string} limit.query - limit
   * @param {string} skip.query - skip
   * @param {string} filter.query - e.g. anything 
   * @returns {Array.<Thing>} 200 - An array of Thing objects
   * @returns {Error}  default - Unexpected error
   */

  /**
   * @route POST /api/things
   * @group things - Operations on things
   * @param {Thing.model} thing.body.required - New thing
   * @returns {Thing} 200 - A single Thing object
   * @returns {Error}  default - Unexpected error
   */  
}

module.exports = ThingController;