class ServiceResponse {
  constructor(isError, data, error) {
    this.isError = isError;
    this.data = data;
    this.error = error;
  }
}

module.exports = ServiceResponse;