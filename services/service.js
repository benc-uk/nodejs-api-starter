const mongoose = require('mongoose');
const ServiceResponse = require('../lib/service-response');

class Service {
  constructor(model) {
    this.model = model;
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      
      if (item) return new ServiceResponse(false, item, null);
    } catch (error) {      
      return new ServiceResponse(true, null, error);
    }
  }
  

}

module.exports = Service;