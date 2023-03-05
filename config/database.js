const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
require("dotenv/config");
dotenv.config({ path: "./config.env" });

const dbConnection = () => {
  //// connect on db on atlas
  mongoose
    .connect(process.env.db_url)
    .then((con) =>
      console.log(`connected successfully ${con.connection.host}`)
    );

  //////connect on db locally
  // mongoose
  //   .connect("mongodb://127.0.0.1:27017/E-commerce")
  //   .then(() => console.log("connected to db successfully"));


  mongoose
    .connect("mongodb://127.0.0.1:27017/AngularProject")
    .then(() => console.log("connected to db successfully"));

};

module.exports = dbConnection;
