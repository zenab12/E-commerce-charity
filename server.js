const express = require("express");
const morgan = require("morgan");
let bodyParser = require("body-parser");
let fs = require("fs");
let path = require("path");
const cors = require("cors");
const compression = require("compression");
const app = express();
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
const ApiError = require("./utils/ApiError");
const globalErr = require("./middlewares/error");
const { Server } = require("http");
const { dirname } = require("path");
require("dotenv/config");
require("dotenv").config({ path: `${__dirname}/config.env` });
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
// const port = 3001;

//connect to db
require("./config/database")();

//some configs to deal with req.body as json and deal with any assets without full path
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors
app.use(cors());
app.options("*", cors());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);



// app.get('/cart', function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' })
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const brandtRoute = require("./routes/brandRoute");

const orderRoute = require("./routes/orderRoute");
//auth,user,cart

const cartRoute = require("./routes/cartRoute");

// userRouter ,authRouter
//routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRoute);

app.use("/category", categoryRoute);
app.use("/brands", brandtRoute);
app.use("/oreders", orderRoute);

app.use("/cart", cartRoute);

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

//// handle errors outside express
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!", err.name, err.message);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});
