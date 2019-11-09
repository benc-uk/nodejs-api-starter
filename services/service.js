var MongoQS = require('mongo-querystring');

// Error messages
const MSG_UPDATE_ERR = 'Update failed, no result from updateOne';
const MSG_DELETE_ERR = 'Delete failed, no result from deleteOne';
const MSG_NO_RESULT = 'No matching docs with given id';

//
// Abstract base service class, all DB interaction logic is here
// Actual concrete services should extend this
//
class Service {
  constructor(model) {
    this.model = model;
  }

  // Add/create new entity to the database
  async insert(data) {
    try {
      let item = await this.model.create(data);
      
      if(item) 
        return item;
      else
        return new Error(MSG_NO_RESULT);
    } catch (error) {      
      return error;
    }
  }

  // Get a single entity by id
  async fetchOne(id) {
    try {
      let item = await this.model.findById(id);

      if(item) 
        return item;
      else 
        return new Error(MSG_NO_RESULT);
    } catch (error) {      
      return error;
    }    
  }

  // Execute a query finding some/all of a given entity
  // See readme.md for details
  async query(queryParams) {
    try {      
      var qs = new MongoQS();
      let { _limit, _skip } = queryParams;
      delete queryParams._limit;
      delete queryParams._skip;

      var query = qs.parse(queryParams);
      
      let item = await this.model.find(query)
      .limit(parseInt(_limit) || 0)
      .skip(parseInt(_skip) || 0);

      if(item)
        return item;
      else 
        return new Error(MSG_NO_RESULT);
    } catch (error) {      
      return error;
    }    
  }

  // Update an existing single entity, id should be in the data
  async update(data) {
    try {
      let result = await this.model.updateOne({_id: data._id}, {$set: data});
      
      if(result) {
        if(result.n !== 1) return new Error(MSG_NO_RESULT)
        return data;
      } else {
        return new Error(MSG_UPDATE_ERR);
      }
    } catch (error) {      
      return error;
    }
  }

  // Delete a single entity by id
  async delete(id) {
    try {
      let result = await this.model.deleteOne({_id: id});
      
      if(result) {
        if(result.n !== 1) return new Error(MSG_NO_RESULT);
        return { message: `Doc '${id}' was successfully deleted` };
      } else {
        return new Error(MSG_DELETE_ERR);
      }
    } catch (error) {      
      return error;
    }
  }  
}

module.exports = Service;