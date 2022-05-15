// External import
const express = require("express");
const decorateHtmlRespons = require("../../middlewar/decorateHtmlRespons");
const router = express.Router();

//Internal import
const {registerValidation, register} = require("../../routerControler/register")


router.get("/register",decorateHtmlRespons("Register-page"), (req, res) => {
    res.render("register");
});

router.post("/register",decorateHtmlRespons("Register-page"), registerValidation, register)

module.exports = router;