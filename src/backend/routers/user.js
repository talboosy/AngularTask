const express = require("express");
const User = require("../models/user");
// const auth = require('../middleware/auth')
var VerifyToken = require("../middleware/verify_token");
const router = new express.Router();

var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var bcrypt = require("bcryptjs");
var config = require("../config"); // get config file

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(201).send({ auth: true, token: token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/register", function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    function (err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});

router.get("/me", VerifyToken, function (req, res) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    res.status(200).send(decoded);
  });
});

router.post("/login", function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null, message:"Password is invalid" });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
});

router.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});


router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
