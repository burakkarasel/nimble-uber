const express = require("express");
const passengerRouter = require("./controller/passengers");
const driverRouter = require("./controller/drivers");
const bookingRouter = require("./controller/booking");
require("./mongo-connection");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/passengers", passengerRouter);
app.use("/api/v1/bookings", bookingRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Started listening at port: ${port}`);
});
