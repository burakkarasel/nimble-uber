const passengerDatabase = require("../database/passenger-database");
const driverDatabase = require("../database/driver-database");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const passengers = await passengerDatabase.load();
    if (!passengers.length) {
      res.sendStatus(204);
      return;
    }
    res.send(passengers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:passengerId", async (req, res) => {
  try {
    const { passengerId } = req.params;
    const passenger = await passengerDatabase.findById(passengerId);

    if (!passenger) {
      res.status(404).send({ error: "User not found!" });
      return;
    }
    res.send(passenger);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;
    const newPassenger = await passengerDatabase.insert({
      name,
      location,
      bookings: [],
    });
    res.status(201).send(newPassenger);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:passengerId", async (req, res) => {
  try {
    const { passengerId } = req.params;
    await passengerDatabase.remove(passengerId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:passengerId", async (req, res) => {
  try {
    const { passengerId } = req.params;
    const { name, location } = req.body;

    const passenger = await passengerDatabase.updateById(passengerId, {
      name,
      location,
    });

    res.send(passenger);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/:passengerId/bookings", async (req, res) => {
  try {
    const { origin, destination, driverId } = req.body;
    const { passengerId } = req.params;

    const passenger = await passengerDatabase.findById(passengerId);

    const booking = await passenger.book(driverId, origin, destination);

    res.send(booking).status(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
