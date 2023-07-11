const BaseDatabase = require("./base-database");
const Passenger = require("../model/passenger");

class PassengerDatabase extends BaseDatabase {
  constructor() {
    super(Passenger);
  }

  findByName = async (name) => {
    return this.findBy("name", name);
  };

  findById = async (id) => {
    return this.findBy("_id", id);
  };
}

module.exports = new PassengerDatabase(Passenger);
