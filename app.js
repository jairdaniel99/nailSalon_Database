// import express
const express = require("express");
// import created sequelize instance
const sequelize = require("./config");
// import customer model
const Customer = require("./models/customer");
// import customer routes
const customerRoutes = require("./routes/customer");
// import cors middleware
const cors = require("cors");

// test the connection to the database
sequelize
  .sync() // sync() will create the table if it does not exist
  .then(() => console.log("connected to database!"))
  .catch((error) => console.log(error));

// create an instance of express server
const app = express();

// json data middleware
app.use(express.json());
// form data middleware
app.use(express.urlencoded({ extended: true }));

// cors middleware
app.use(cors());

//use customer routes
app.use(customerRoutes);

// Process is an object that represents the current nodeJS process
// process.env is an object that contains the current environment variables
//process.env.PORT is an environment that is set by the hosting service
app.listen(process.env.PORT || 3000, function () {
  console.log("CORS-enabled Server is running on port 3000");
});

//REFERENCE FOR CAPSTONE
