const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');
const database = require('./core/database');

// Load .env file if it exists
require('dotenv').config()

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
  // Disable logging
} else {
  app.use(logger('dev'));
}
console.log(`### Node environment is '${app.get('env')}'`);

// Get config from env vars or defaults where not provided
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_CONNSTR || process.env.MONGO_CONNECTION || process.env.MONGO_URL || `mongodb://localhost`
const mongoTimeout = process.env.MONGO_CONNECT_TIMEOUT || 30000

// Load API routes
const apiRoutes = require('./core/routes');
apiRoutes(app);

// Start the app and connect to MongoDB
app.listen(port, async () => {
  try {
    await new database(mongoUrl, mongoTimeout);

    console.log(`### Connected OK. Server up & listening on port ${port}`);
  } catch(err) {
    console.log(`### Error connecting to MongoDB: ${err}\n### Terminating...`);
    process.exit(1);
  }
});
