const Customer = require("../models/customer");
const Booking = require("../models/booking");
// create a router instance/object to define our routes
const router = require("express").Router();

// get all customers
router.get("/customers", function (req, res) {
  //   get customers from the database
  Customer.findAll()
    .then((customers) => {
      res.send(customers);
    })
    .catch((error) => {
      console.log(error, 500);
    });
});

// get a customer by id
router.get("/customers/:id", function (req, res) {
  // find the customer with given id
  Customer.findByPk(parseInt(req.params.id))
    .then((result) => {
      // if the result is a truthy value
      if (result) {
        res.send(result);
      } else {
        res.send("Customer not found.", 404);
      }
    })
    .catch((error) => {
      console.log(error, 500); // internal server error
    });
});

// create customer data to the database
router.post("/customers", function (req, res) {
  // create a new customer object
  const newCustomer = {
    name: req.body.name,
    grade: req.body.grade,
    age: req.body.age,
  };
  // create a new customer record in the database
  Customer.create(newCustomer)
    .then((customer) => {
      res.send(customer);
    })
    .catch((error) => {
      console.log(error, 500);
    });
});

router.patch("/customers/:id", function (req, res) {
  // find the customer with given id
  // select * from customers where id = *
  Customer.findByPk(parseInt(req.params.id))
    .then((customer) => {
      customer.name = req.body.name;
      customer.grade = req.body.grade;
      customer.age = req.body.age;
      customer.level = req.body.level;
      // save the updates
      customer.save();
      req.send(customer);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/customers/:id", function (req, res) {
  // find the customer with given id
  // select * from customers where id = *
  Customer.findByPk(parseInt(req.params.id))
    .then((customer) => {
      // if the customer is a truthy value
      if (customer) {
        // delete the customer from the database
        customer.destroy();
        res.send(customer);
      } else {
        res.send("Customer not found.", 404);
      }
    })
    .catch((error) => {
      console.log(error, 500);
    });
});

// use this in router.js
module.exports = router;
