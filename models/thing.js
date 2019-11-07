const mongoose = require ('mongoose');

class Thing {
  initSchema() {
    const thingSchema = new mongoose.Schema({
      name:     { type: String, required: true },
      age:      { type: Number },
      cheese:   { type: String, required: false, enum: ['cheddar', 'edam', 'brie', 'mozzarella'] },
      birthday: { type: Date, required: false },
    });
    
    thingSchema.pre('save', function(next) {
        var thing = this;
        // Additional validation code here
        next();
      }
    );

    mongoose.model("things", thingSchema);
  }

  getInstance() {
    // Ensure model schema is initialized only once
    if(!mongoose.modelNames().includes("things"))
      this.initSchema();

    return mongoose.model("things");
  }
}

function makeId(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = Thing;
