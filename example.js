const Passenger = require("./models/passenger");
const Driver = require("./models/driver");

const driverDatabase = require("./database/driver-database");
const passengerDatabase = require("./database/passenger-database");

const burak = new Passenger("Burak", "Kreuzberg");
const stefan = new Driver("Stefan", "Kreuzberg");

(async () => {
  //   burak.book(stefan, "Kreuzberg", "Neukolln");

  //   burak.book(stefan, "Neukolln", "Mitte");

  //   await passengerDatabase.save([burak]);

  //   await driverDatabase.save([stefan]);

  //   const deha = new Passenger("Deha", "Mitte");
  //   await passengerDatabase.insert(deha);

  //   const foundBurak = await passengerDatabase.findByName("Burak");

  //   const foundDeha = await passengerDatabase.findByName("Deha");

  //   foundBurak.book(stefan, "Mitte", "Kreuzberg");

  //   foundDeha.book(stefan, "Mitte", "Kreuzberg");

  //   await passengerDatabase.save([foundBurak, foundDeha]);

  try {
    const gotBurak = await passengerDatabase.findByName("Burak");

    gotBurak.printBookingHistory();

    const gotDeha = await passengerDatabase.findByName("Deha");

    gotDeha.printBookingHistory();

    await passengerDatabase.updateById(gotBurak);

    const newBurak = await passengerDatabase.findById(gotBurak.id);

    newBurak.printBookingHistory();

    console.log(newBurak.bookings[0].driver);

    console.log(gotDeha);
  } catch (e) {
    console.log(e);
  }
})();
