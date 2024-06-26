// import sequelize object for additional functions
const Sequelize = require("sequelize");
// import our instance of sequelize
const sequelize = require("../config");
// import service model
const Service = require("./service");

const Customer = require("./customer");

// create a model for the customer table
// sequalize will automatically create a table called customers
// we want to avoid the automatic pluralization of studen
const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// a customer can have many bookings
// a booking can only belong to ONE customer
// one to many relationships require a foreign key on the child table
// define hasMany relation
Customer.hasMany(Booking, {
  foreignKey: "customer_id",
  onDelete: "CASCADE",
});

// hasMany needs a belongsTo to work!
Booking.belongsTo(Customer, {
  foreignKey: "customer_id",
});

// a booking has one service
// a service can have many bookings
Booking.belongsTo(Service, {
  foreignKey: "service_id",
});

Service.hasMany(Booking, {
  foreignKey: "service_id",
  onDelete: "CASCADE",
});

module.exports = Booking;
