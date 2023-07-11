const BaseService = require("./base-service");
const Driver = require("../model/driver");

class DriverService extends BaseService {
  constructor() {
    super(Driver);
  }

  findByName = async (name) => {
    return this.findBy("name", name);
  };

  findByLocation = (location) => {
    return this.findBy("location", location);
  };

  findById = (id) => {
    return this.findBy("_id", id);
  };
}

module.exports = new DriverService(Driver);
