const uuid = require("uuid");
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  driver: {
    type: mongoose.Types.ObjectId,
    ref: "Driver",
    autopopulate: { maxDepth: 1 },
  },
  passenger: {
    type: mongoose.Types.ObjectId,
    ref: "Passenger",
    autopopulate: { maxDepth: 1 },
  },
});

BookingSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Booking", BookingSchema);
