const express = require("express");
const questionsRoutes = express.Router();
let Questions = require("../models/question.model");

questionsRoutes.route("/").get(function(req, res) {
  Questions.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

questionsRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Questions.findById(id, function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

questionsRoutes.route("/create").post(function(req, res) {
  let question = new Questions(req.body);
  question
    .save()
    .then(question => {
      res.status(200).json({ question: "question added successfully" });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// questionsRoutes.route('/update/:id').post(function(req, res) {
//     Questions.findById(req.params.id, function(err, todo) {
//         if (!todo)
//             res.status(404).send("data is not found");
//         else
//             todo.todo_description = req.body.todo_description;
//             todo.todo_responsible = req.body.todo_responsible;
//             todo.todo_priority = req.body.todo_priority;
//             todo.todo_completed = req.body.todo_completed;
//
//             todo.save().then(todo => {
//                 res.json('Questions updated!');
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// });

module.exports = questionsRoutes;
