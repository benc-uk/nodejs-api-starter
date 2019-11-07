const mongoose = require('mongoose');

const DB_NAME = "foo";

class Connection {
  constructor(mongoUrl) {
    console.log(`### Connecting to MongoDB: ${mongoUrl}`);
    //mongoose.Promise = global.Promise;
    
    const options = {
      promiseLibrary: global.Promise,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME
    }

    return mongoose.connect(mongoUrl, options);
  }
}

module.exports = Connection;