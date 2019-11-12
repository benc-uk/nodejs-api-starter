const mongoose = require ('mongoose');

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ! PLACEHOLDER CODE - REMOVE / REPLACE THIS !
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const SCHEMA_NAME = 'Thing';

// The following comment block is used by express-swagger-generator
// Remove as required, see https://github.com/pgroot/express-swagger-generator
/**
 * @typedef Thing
 * @property {string} name.required - Name of this thing
 * @property {number} count         - Number of things 
 * @property {string} created       - Created date, RFC 3339 format
 * @property {enum}   cheese        - A type of cheese - eg: cheddar,edam,brie,mozzarella
 */
class Thing {
  // Set up the Mongoose schema, see https://mongoosejs.com/docs/guide.html
  initSchema() {
    const schema = new mongoose.Schema({
      name:     { type: String, required: true },
      count:    { type: Number },
      cheese:   { type: String, required: false, enum: ['cheddar', 'edam', 'brie', 'mozzarella'] },
      created:  { type: Date, required: false },
    });
    
    // Middleware is optional, it looks kinda like this, see https://mongoosejs.com/docs/middleware.html
    schema.pre('save', function(next) {
        var thing = this;
        // Additional validation/mutation code here as needed
        next();
      }
    );

    // Create the mongoose model from schema
    mongoose.model(SCHEMA_NAME, schema);
  }

  // Return an instance of Thing model
  getInstance() {
    // Ensure model schema is initialized only once
    if(!mongoose.modelNames().includes(SCHEMA_NAME))
      this.initSchema();

    return mongoose.model(SCHEMA_NAME);
  }
}

module.exports = Thing;