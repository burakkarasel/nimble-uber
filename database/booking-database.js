const BaseDatabase = require("./base-database");
const Booking = require("../model/booking");

class BookingDatabase extends BaseDatabase {
  constructor() {
    super(Booking);
  }
}

module.exports = new BookingDatabase(Booking);
