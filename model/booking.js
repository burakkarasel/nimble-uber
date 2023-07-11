const uuid = require("uuid");
const mongoose = require("mongoose");
const Driver = require("./driver");

const BookingSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  driverId: {
    type: mongoose.Types.ObjectId,
    ref: "Driver",
    autopopulate: true,
  },
  passengerId: {
    type: mongoose.Types.ObjectId,
    ref: "Passenger",
    autopopulate: true,
  },
});

BookingSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Booking", BookingSchema);
