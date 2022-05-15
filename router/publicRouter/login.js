// External imports
const express = require("express");
const decorateHtmlRespons = require("../../middlewar/decorateHtmlRespons");
const {loginValidator, login} = require("../../routerControler/login");

const router = express.Router();

router.get("/login",decorateHtmlRespons("Login-page"), (req, res) => {
          res.render("login")
});

router.post("/login", decorateHtmlRespons("Login-page"), loginValidator, login)

module.exports = router;