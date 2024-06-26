// import sequelize object for additional functions
const Sequelize = require("sequelize");
// import our instance of sequelize
const sequelize = require("../config");
// import service model
const Service = require("./service");

// create a model for the customer table
// sequalize will automatically create a table called customers
// we want to avoid the automatic pluralization of studen
const Customer = sequelize.define(
  "Customer",
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
// define hasMany relation
Customer.hasMany(Service, {
  foreignKey: "customer_id",
  onDelete: "CASCADE",
});

// hasMany needs a belongsTo to work!
Service.belongsTo(Customer, {
  foreignKey: "customer_id",
});

module.exports = Customer;
