const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
require("./config/dbConnect");

const app = express();

const authRouter = require("./routes/authRoutes");
const lensRouter = require("./routes/lensRoutes");
const markerRouter = require("./routes/markerRoutes");
const userRouter = require("./routes/userRoutes");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

app.use(mongoSanitize()); // protection against NoSQL injection
app.use(xss()); // protection against xss

app.enable("trust proxy");
app.use(cors({ credentials: true, origin: process.env.REMOTE }));
app.options(process.env.REMOTE, cors());

const limiter = rateLimit({
  // <- Limits the number of api calls that can be made per IP address
  max: 2000, // max number of times per windowMS
  windowMs: 60 * 60 * 1000,
  message: "!!! Too many requests, Please try again in 1 hour !!!",
});

app.use("/api/v1", limiter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/lens/", lensRouter);
app.use("/api/v1/marker/", markerRouter);
app.use("/api/v1/user/", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server up at port " + port);
});

process.on("unCaughtException", (err) => {
  console.log(`UNCAUGHT EXCEPTION -> ${err.name} - ${err.message}`);
  console.log("App SHUTTING DOWN...");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(`UNHANDELLED REJECTION -> ${err.name} - ${err.message}`);
  console.log(err);
  console.log("App SHUTTING DOWN...");
  server.close(() => {
    process.exit(1); 
  });
});
