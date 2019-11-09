const mongoose = require('mongoose');



class Connection {
  constructor(mongoUrl, connectTimeout) {
    console.log(`### Connecting to MongoDB: ${mongoUrl}`);
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: connectTimeout
    }

    return mongoose.connect(mongoUrl, options)
  }
}

module.exports = Connection;