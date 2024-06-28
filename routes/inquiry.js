const Inquiry = require("../models/inquiry");
// create a router instance/object to define our routes
const router = require("express").Router();
const Service = require("../models/service");

// route functionality
// be able to post a inquiry in the database from the front end

// get all inquiries
router.get("/inquiries", function (req, res) {
  //   get inquiries from the database
  Inquiry.findAll()
    .then((inquiries) => {
      res.send(inquiries);
    })
    .catch((error) => {
      console.log(error, 500);
    });
});

// get a inquiry by id
router.get("/inquiries/:id", function (req, res) {
  // find the inquiry with given id
  Inquiry.findByPk(parseInt(req.params.id))
    .then((result) => {
      // if the result is a truthy value
      if (result) {
        res.send(result);
      } else {
        res.send("Inquiry not found.", 404);
      }
    })
    .catch((error) => {
      console.log(error, 500); // internal server error
    });
});

// create inquiry data to the database
router.post("/inquiries", function (req, res) {
  // create a new inquiry object
  const newInquiry = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    addons: req.body.addons,
    service_id: req.body.service_id,
    information: req.body.information,
  };
  // create a new inquiry record in the database
  Inquiry.create(newInquiry)
    .then((inquiry) => {
      res.send(inquiry);
    })
    .catch((error) => {
      console.log(error, 500);
    });
});

router.patch("/inquiries/:id", function (req, res) {
  // find the inquiry with given id
  // select * from inquiries where id = *
  Inquiry.findByPk(parseInt(req.params.id))
    .then((inquiry) => {
      inquiry.name = req.body.name;
      inquiry.grade = req.body.grade;
      inquiry.age = req.body.age;
      inquiry.level = req.body.level;
      // save the updates
      inquiry.save();
      req.send(inquiry);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/inquiries/:id", function (req, res) {
  // find the inquiry with given id
  // select * from inquiries where id = *
  Inquiry.findByPk(parseInt(req.params.id))
    .then((inquiry) => {
      // if the inquiry is a truthy value
      if (inquiry) {
        // delete the inquiry from the database
        inquiry.destroy();
        res.send(inquiry);
      } else {
        res.send("Inquiry not found.", 404);
      }
    })
    .catch((error) => {
      console.log(error, 500);
    });
});

// use this in router.js
module.exports = router;
