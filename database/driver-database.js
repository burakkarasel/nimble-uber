const BaseDatabase = require("./base-database");
const Driver = require("../model/driver");

class DriverDatabase extends BaseDatabase {
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

module.exports = new DriverDatabase(Driver);
