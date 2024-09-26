const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const cron = require('node-cron');
const moment = require('moment-timezone');

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotENV = require("dotenv");
const {
  DefaultErrorHandler,
  NotFoundError,
} = require("./src/utility/ErrorHandler");
dotENV.config();

let URL =
  "mongodb+srv://amitbd591:<password>@cluster0.4kz14t4.mongodb.net/invoice?retryWrites=true&w=majority&appName=Cluster0";
let option = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  autoIndex: true,
  serverSelectionTimeoutMS: 50000
};
mongoose
  .connect(URL, option)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set('bufferCommands', false);


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


//Not Found Error Handler
app.use(NotFoundError);

// Default Error Handler
app.use(DefaultErrorHandler);



// Function to restart the server
function restartServer() {
  console.log('Restarting server...');

  // Spawn a new instance of the server
  const subprocess = spawn('node', ['index.js'], {
    detached: true,
    stdio: 'inherit'
  });

  // Exit the current server
  subprocess.unref();
  process.exit();
}

// Schedule a task to restart the server at 23:59 BD time
cron.schedule('59 23 * * *', () => {
  const now = moment().tz('Asia/Dhaka').format('HH:mm');
  console.log(`Scheduled restart at BD time: ${now}`);
  restartServer();
}, {
  timezone: "Asia/Dhaka"
});

module.exports = app;
