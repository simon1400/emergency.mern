const express = require("express");
const questionsRoutes = express.Router();
let Questions = require("../models/question.model");

questionsRoutes.route("/").get(function(req, res) {
  Questions.find(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

questionsRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Questions.findById(id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

questionsRoutes.route("/create").post(function(req, res) {
  var question = new Questions(req.body);
  console.log(question);
  question
    .save()
    .then(question => {
      res
        .status(200)
        .json({ question: "question added successfully", data: question });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

questionsRoutes.route("/delete/:id").delete(function(req, res) {
  let id = req.params.id;
  Questions.remove({ _id: id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

questionsRoutes.route("/update/:id").post(function(req, res) {
  Questions.findById(req.params.id, function(err, question) {
    if (!question) res.status(404).send("data is not found");
    else question.nameTest = req.body.nameTest;
    question.questions = req.body.questions;

    question
      .save()
      .then(question => {
        res.json("Questions updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = questionsRoutes;
