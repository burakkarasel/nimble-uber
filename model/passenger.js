const mongoose = require("mongoose");
const Booking = require("./booking");

const PassengerSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  location: String,
  age: { type: Number, required: true, min: 18 },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
      autopopulate: { maxDepth: 2 },
    },
  ],
});

// to make autopopulate bookings
PassengerSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Passenger", PassengerSchema);
