// import sequelize object for additional functions
const Sequelize = require("sequelize");
// import our instance of sequelize
const sequelize = require("../config");
// import service model
const Service = require("./service");

// create a model for the customer table
// sequalize will automatically create a table called customers
// we want to avoid the automatic pluralization of studen
const Inquiry = sequelize.define(
  "inquiry",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "-1",
    },
    service: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    addons: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    information: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// an inquiry can have one service
// a service can have many inquiries
// Service.hasMany(Inquiry, {
//   foreignKey: "service_id",
//   onDelete: "CASCADE",
// });

// // hasMany needs a belongsTo to work!
// Inquiry.belongsTo(Service, {
//   foreignKey: "service_id",
// });

module.exports = Inquiry;
