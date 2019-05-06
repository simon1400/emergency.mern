const express = require("express");
const resultRoutes = express.Router();
let Result = require("../models/result.model");

resultRoutes.route("/").get(function(req, res) {
  Result.find(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

resultRoutes.route("/all/:id").get(function(req, res) {
  let id = req.params.id;
  Result.find({ idTest: id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

resultRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Result.findById(id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

resultRoutes.route("/create").post(function(req, res) {
  let result = new Result(req.body);
  result
    .save()
    .then(result => {
      res
        .status(200)
        .json({ result: "result added successfully", data: result });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

resultRoutes.route("/delete/:id").delete(function(req, res) {
  let id = req.params.id;
  Result.remove({ _id: id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

resultRoutes.route("/update/:id").post(function(req, res) {
  Result.findById(req.params.id, function(err, result) {
    if (!result) res.status(404).send("data is not found");
    else {
      result.currentAsk = req.body.currentAsk;
      result.nameTest = req.body.nameTest;
      result.answers = req.body.answers;
      result.date = req.body.date;
      result.done = req.body.done;
      result.userId = req.body.userId;
    }

    result
      .save()
      .then(result => {
        res.json("Result updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = resultRoutes;
