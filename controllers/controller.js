
class Controller {

  constructor(service) {
    this.service = service;

    // We must use bind here, as this will be not what we expect when the route handler is invoked
    this.insert = this.post.bind(this);
  }

  //
  //
  //
  async post(req, res) {
    try {      
      let response = await this.service.insert(req.body);
      if(response.isError) throw response.error

      this._sendData(res, response.data);
    } catch(err) {
      this._sendError(res, err);
    }
  }

  _sendData(res, data) {
    res.type('application/json');
    console.log(data);
    
    res.status(200).send(data);
  }

  _sendError(res, err, title = 'api-error') {
    console.log(`### Error with API ${err.toString()}`); 
    let source = ((new Error().stack).split("at ")[2]).trim();

    let statusCode = err.code ? err.code : 500;
    if(statusCode < 100 || statusCode > 999) statusCode = 500;

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