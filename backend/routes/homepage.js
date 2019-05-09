const express = require("express");
const homepageRoutes = express.Router();
let Homepage = require("../models/homepage.model");

homepageRoutes.route("/").get(function(req, res) {
  Homepage.find(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// homepageRoutes.route("/create").post(function(req, res) {
//   let homepage = new Homepage(req.body);
//   homepage
//     .save()
//     .then(homepage => {
//       res.status(200).json({ data: homepage });
//     })
//     .catch(err => {
//       res.status(400).send(err);
//     });
// });

homepageRoutes.route("/update/:id").post(function(req, res) {
  Homepage.findById(req.params.id, function(err, homepage) {
    if (!homepage) res.status(404).send("data is not found");
    else homepage.head = req.body.head;
    homepage.description = req.body.description;

    homepage
      .save()
      .then(homepage => {
        res.json("Homepage updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = homepageRoutes;
