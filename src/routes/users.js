const express = require("express");
const passport = require("../config/passport");
const router = express.Router();

router.post("/signup", passport.authenticate("signup"), (req, res) => {
  res.json(req.user);
});

router.post("/login", passport.authenticate("login"), (req, res) => {
  res.json(req.user);
});

module.exports = router;
