const passengerDatabase = require("../database/passenger-database");
const driverDatabase = require("../database/driver-database");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const drivers = await driverDatabase.load();
    if (!drivers.length) {
      res.sendStatus(204);
      return;
    }
    res.send(drivers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await driverDatabase.findById(driverId);
    if (!driver) {
      res.status(404).send({ error: "User not found!" });
      return;
    }
    res.send(driver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;
    const newdriver = await driverDatabase.insert({
      name,
      location,
    });
    res.status(201).send(newdriver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    await driverDatabase.remove(driverId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch("/:driverId", async (req, res) => {
  try {
    const { driverId } = req.params;
    const { name, location } = req.body;

    const driver = await driverDatabase.updateById(driverId, {
      name,
      location,
    });

    res.send(driver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
