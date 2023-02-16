const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const userRouter = require("./routes/userRoutes");

const port = 3000;
mongoose
  .connect("mongodb://127.0.0.1:27017/E-commerce")
  .then(() => console.log("connected to db successfully"));
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

app.use("/users", userRouter);
