const express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let path = require("path");
const app = express();
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
const ApiError = require("./utils/ApiError");
const globalErr = require("./middlewares/error");
const { Server } = require("http");
require("dotenv/config");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

//connect to db
require("./config/database")();

//some configs to deal with req.body as json and deal with any assets without full path
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
//route is not exist
app.all("*", (req, res, next) => {
  //create error
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
  //another solution
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  // next(res.message);
});

//Global error handler middleware
app.use(globalErr);

const server = app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

//handle errors outside express
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!", err.name, err.message);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});