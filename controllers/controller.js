
class Controller {

  constructor(service) {
    this.service = service;

    // We must use bind here, as this will be not what we expect when the route handler is invoked
    this.insert = this.post.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async post(req, res) {
    try {      
      let resp = await this.service.insert(req.body);
      if(resp instanceof Error) throw resp;

      this._sendData(res, resp);
    } catch(err) {
      this._sendError(res, err);
    }
  }

  async get(req, res) {
    try {
      let resp;
      if(req.params.id)
        resp = await this.service.fetchOne(req.params.id);
      else 
        resp = await this.service.query(req.query);

      if(resp instanceof Error) throw resp;

      this._sendData(res, resp);
    } catch(err) {
      this._sendError(res, err);
    }
  }

  async update(req, res) {
    try {
      let doc = req.body
      doc._id = req.params.id;
      let resp = await this.service.update(doc);
      if(resp instanceof Error) throw resp;

      this._sendData(res, resp);
    } catch(err) {
      this._sendError(res, err);
    }
  }

  async delete(req, res) {
    try {
      let resp = await this.service.delete(req.params.id);
      if(resp instanceof Error) throw resp;

      this._sendData(res, resp);
    } catch(err) {
      this._sendError(res, err);
    }
  }

  _sendData(res, data, code = 200) {
    res.type('application/json');
    res.status(code).send(data);
  }

  _sendError(res, err, title = 'error') {    
    console.log(`### Error with API ${err.toString()}`);    
    let source = ((new Error().stack).split("at ")[2]).split(" ")[0]

    let statusCode = 500;
    if(err.toString().toLowerCase().includes("no matching docs")) {
      statusCode = 404;
    }
    if(err.toString().toLowerCase().includes("validationerror")) {
      statusCode = 400;
      title = 'validation-error'
    }

    // Problem Details object as per https://tools.ietf.org/html/rfc7807
    let problemDetails = {
      error: true,
      title: title,
      details: err.toString(),
      status: statusCode,
      source: source
    };

    res.status(statusCode).send(problemDetails);
  }  
}

module.exports = Controller;