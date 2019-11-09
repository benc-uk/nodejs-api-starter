const Controller = require('./controller');
const mongoose = require ('mongoose');
const os = require ('os');
const fs = require ('fs');

class HealthController extends Controller {
  constructor(service) { 
    super(service);
  }

  //
  // GET - 
  //
  async get(req, res) {
    try {
      let packageJson = require('../package.json');
      let status = 'pass';
      let output = '';
      let code = 200;
      let showDebug = true; //process.env.NODE_ENV != 'production'

      if(mongoose.connection.readyState != 1) {
        status = 'fail';
        output = `Database is not connected! State: ${mongoose.STATES[mongoose.connection.readyState]}`;
        code = 503;
      } 

      let resp = {
        status:      status,
        version:     packageJson.version,
        releaseID:   process.env.RELEASE_INFO || 'No release info',
        output:      output,
        description: packageJson.name,        
      }

      if(showDebug) {
        resp.debug = { 
          hostInfo: {
            hostname:  os.hostname(),
            osType:    os.type(),
            osRelease: os.release(),
            cpuArch:   os.arch(),
            cpuModel:  os.cpus()[0].model,
            cpuCount:  os.cpus().length,
            memoryGB:    Math.round(os.totalmem() / (1000*1000*1000)),
            uptime:    _convertSeconds(os.uptime()),
          },
          nodeInfo: {
            version:     process.version,
            environment: process.env.NODE_ENV || 'NODE_ENV is not set',
          },
          runtimeInfo: {
            processPath:  process.title,
            memoryRssMB:  process.memoryUsage().rss / 1048576,
            processUid:   process.getuid(),
            inContainer:  fs.existsSync('/.dockerenv'), 
            inKubernetes: fs.existsSync('/var/run/secrets/kubernetes.io')
          }          
        }
      }

      if(showDebug && mongoose.connection.readyState == 1) {
        var admin = await new mongoose.mongo.Admin(mongoose.connection.db);
        let mongoBuildInfo = await admin.buildInfo();
        resp.debug.mongoInfo = {
          version: mongoBuildInfo.version,
          host:    mongoose.connection.host,
          port:    mongoose.connection.port,
          db:      mongoose.connection.db.databaseName
        }
      }

      this._sendData(res, resp, code);
    } catch(err) {
      this._sendError(res, err);
    }
  }  
}

// Util to convert seconds to DD:HH:MM:SS 
function _convertSeconds(n)  { 
  let days = Math.floor(n / (24 * 3600)); 
  n = n % (24 * 3600); 
  let hours = Math.floor(n / 3600); 
  n %= 3600; 
  let mins = Math.floor(n / 60); 
  n %= 60; 
  let secs = n;
  return `${days} days, ${hours} hours, ${mins} mins, ${secs} seconds`;
} 

module.exports = HealthController;