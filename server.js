const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');
const ExpressSwaggerGenerator = require('express-swagger-generator')

const databaseConnection = require('./core/database');
const apiRoutes = require('./core/routes');

// Load .env file if it exists
require('dotenv').config()

// Disable all console output when testing
if(process.env.NODE_ENV == 'test') console.log = function() {}

// Create express app
console.log(`### API service starting...`);
const app = express();

// Allow all CORS and parse any JSON we receive
app.use(cors());
app.use(bodyParser.json())

// Set up logging based on environment (set by NODE_ENV)
if(app.get('env') === 'production') {
  app.use(logger('short'))
} else if(app.get('env') === 'test') {
  // Disable logging in test
} else {
  app.use(logger('dev'));
}
console.log(`### Node environment is: ${app.get('env')}`);

// Get config from env vars or defaults where not provided
const port = process.env.PORT || 3000;
var mongoUrl = process.env.MONGO_CONNSTR || process.env.MONGO_CONNECTION || process.env.MONGO_URL || `mongodb://localhost`
const mongoTimeout = process.env.MONGO_CONNECT_TIMEOUT || 30000

// Load API routes
apiRoutes(app);

// OPTIONAL - Set up express-swagger-generator
// Remove if you don't want to use the auto generator
const expressSwagger = new ExpressSwaggerGenerator(app);
let options = {
  swaggerDefinition: {
    // Customize here, see docs https://github.com/pgroot/express-swagger-generator#usage
  },
  basedir: __dirname, 
  files: ['./controllers/**/*.js', './models/**/*.js'] 
};
expressSwagger(options)

// Catch annoying favicon.ico & robot.txt requests, return nothing
app.get(['/favicon.ico', '/robots*.txt'], function (req, res, next) {
  res.sendStatus(204);
})

// Global catch all for all requests not caught by other routes
// Return a HTTP 404 plus our standard error response JSON
app.use('*', function (req, res, next) {
  // Fake dummy controller, so we can call _sendError()
  const ctrl = new (require('./controllers/controller'))(null);
  ctrl._sendError(res, new Error("API route not implemented"), "not-found", 404)
})

// =========================================
// Start the app and connect to MongoDB
// =========================================
app.listen(port, async () => {
  try {
    // When testing run in-memory database
    if(process.env.NODE_ENV == 'test') {
      const mongoMemSrv = require('mongodb-memory-server');
      const mongod = await new mongoMemSrv.MongoMemoryServer();
      mongoUrl = await mongod.getConnectionString();
    }

    // Try to connect to database, and await the promise returned 
    await new databaseConnection(mongoUrl, mongoTimeout);

    console.log(`### Connected OK. Server up & listening on port ${port}`);
  } catch(err) {
    console.log(`### Error connecting to MongoDB: ${err}\n### Terminating...`);
    process.exit(1);
  }
});

// Only required for unit tests
module.exports.app = app;