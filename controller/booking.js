const bookingService = require("../service/booking-service");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const { driverId, passengerId } = req.query;
  if (!passengerId) {
    res.send({ error: "Passenger must be specified!" }).status(400);
    return;
  }
  try {
    const bookings = await bookingService.listBookings(passengerId, driverId);
    if (!bookings.length) {
      res.sendStatus(204);
      return;
    }
    res.send(bookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingService.findById(bookingId);
    if (!booking) {
      res.status(404).send({ error: "User not found!" });
      return;
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
