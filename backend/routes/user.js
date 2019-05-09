const express = require("express");
const userRoutes = express.Router();
let User = require("../models/user.model");

const bcrypt = require('bcrypt');
const saltRounds = 10;


userRoutes.route("/all/").get(function(req, res) {
  User.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

userRoutes.route("/login/:rodneCislo/:password").get(function(req, res) {
  var rodneCislo = req.params.rodneCislo;
  var password = req.params.password;
  User.findOne({ "rodneCislo": rodneCislo }, function(err, data) {
    if (err) {
      console.log(err);
    } else if(data) {
      if(bcrypt.compareSync(password, data.password)){
        res.json(data);
      }else{
        res.send('errorpassword')
      }
    }else{
      res.send('errorlogin')
    }
  });
});

userRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

userRoutes.route("/all/:type").get(function(req, res) {
  let type = req.params.type;
  User.find({ typeUser: type }, function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

userRoutes.route("/create").post(function(req, res) {
  let user = new User(req.body);
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash

  user
    .save()
    .then(user => {
      res.status(200).json({ data: user });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

userRoutes.route("/delete/:id").delete(function(req, res) {
  let id = req.params.id;
  User.remove({ _id: id }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

userRoutes.route("/update/:id").post(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send("data is not found");
    else user.name = req.body.name;
    user.surname = req.body.surname;
    user.rodneCislo = req.body.rodneCislo;
    user.password = req.body.password;
    user.typeUser = req.body.typeUser;
    user.selectTest = req.body.selectTest;

    user
      .save()
      .then(user => {
        res.json("User updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = userRoutes;
