const passengerService = require("../service/passenger-service");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const passengers = await passengerService.load();
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
    const passenger = await passengerService.findById(passengerId);

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
    const { name, location, age } = req.body;
    const newPassenger = await passengerService.insert({
      name,
      location,
      bookings: [],
      age,
    });
    res.status(201).send(newPassenger);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ error: error.message });
      return;
    }
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:passengerId", async (req, res) => {
  try {
    const { passengerId } = req.params;
    await passengerService.remove(passengerId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:passengerId", async (req, res) => {
  try {
    const { passengerId } = req.params;
    const { name, location } = req.body;

    const passenger = await passengerService.updateById(passengerId, {
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

    const booking = await passengerService.book(
      passengerId,
      driverId,
      origin,
      destination
    );

    res.send(booking).status(201);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
