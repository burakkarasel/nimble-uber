const BaseService = require("./base-service");
const Passenger = require("../model/passenger");
const bookingService = require("./booking-service");

class PassengerService extends BaseService {
  constructor() {
    super(Passenger);
  }

  findByName = async (name) => {
    return this.findBy("name", name);
  };

  findById = async (id) => {
    return this.findBy("_id", id);
  };

  book = async (passengerId, driver, origin, destination) => {
    const passenger = await this.findById(passengerId);

    const booking = await bookingService.insert({
      passenger: passengerId,
      driver,
      origin,
      destination,
    });

    passenger.bookings.push(booking._id);

    await this.model.findByIdAndUpdate(passenger._id, passenger);

    return booking;
  };
}

module.exports = new PassengerService(Passenger);
