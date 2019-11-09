const mongoose = require ('mongoose');

//
// Demo example Thing model
//

const SCHEMA_NAME = 'Thing';

class Thing {
  // Set up the Mongoose schema, see https://mongoosejs.com/docs/guide.html
  initSchema() {
    const thingSchema = new mongoose.Schema({
      name:     { type: String, required: true },
      age:      { type: Number },
      cheese:   { type: String, required: false, enum: ['cheddar', 'edam', 'brie', 'mozzarella'] },
      birthday: { type: Date, required: false },
    });
    
    // Middleware is optional, it looks kinda like this, see https://mongoosejs.com/docs/middleware.html
    thingSchema.pre('save', function(next) {
        var thing = this;
        // Additional validation/mutation code here as needed
        next();
      }
    );

    // Create the mongoose model from schema
    mongoose.model(SCHEMA_NAME, thingSchema);
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