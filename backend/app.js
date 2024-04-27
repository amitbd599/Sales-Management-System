const express = require("express");
const router = require("./src/routes/api");
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotENV = require("dotenv");
dotENV.config();

let URL =
  "mongodb+srv://<username>:<password>@cluster0.fsp0qs4.mongodb.net/invoice-mern?retryWrites=true&w=majority";
let option = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  autoIndex: true,
};
mongoose
  .connect(URL, option)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.Origin_HOST,
  })
);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.use("/api/v1", router);

module.exports = app;
