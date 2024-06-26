// import sequelize object for additional functions
const Sequelize = require("sequelize");
// import our instance of sequelize
const sequelize = require("../config");

// create a model for the customer table
// sequalize will automatically create a table called customers
// we want to avoid the automatic pluralization of studen
const Service = sequelize.define(
  "Service",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Service;
