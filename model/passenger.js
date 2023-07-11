const mongoose = require("mongoose");
const Booking = require("./booking");

const PassengerSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
        autopopulate: true,
      },
    ],
  },
  {
    methods: {
      async book(driverId, origin, destination) {
        const booking = await Booking.create({
          driverId,
          passengerId: this._id,
          origin,
          destination,
        });

        this.bookings.push(booking._id);

        await mongoose.model("Passenger").findByIdAndUpdate(this._id, this);

        return booking;
      },
    },
  }
);

// PassengerSchema.methods.book = async (driver, origin, destination) => {
//   const booking = await Booking.create({
//     driver,
//     passenger: this,
//     origin,
//     destination,
//   });

//   console.log(booking);

//   console.log(this);

//   this.bookings.push(booking._id);

//   await this.findByIdAndUpdate(this._id, this);

//   return booking;
// };

// to make autopopulate bookings
PassengerSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Passenger", PassengerSchema);
