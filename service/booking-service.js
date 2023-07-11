const BaseService = require("./base-service");
const Booking = require("../model/booking");

class BookingService extends BaseService {
  constructor() {
    super(Booking);
  }

  findById = async (id) => {
    return this.model.findBy("_id", id);
  };

  listBookings = async (passengerId, driverId) => {
    if (!driverId) return this.findWithFilter({ ["passenger"]: passengerId });
    return this.findWithFilter({
      ["passenger"]: passengerId,
      ["driver"]: driverId,
    });
  };
}

module.exports = new BookingService(Booking);
