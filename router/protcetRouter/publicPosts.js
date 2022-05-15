// External import
const fs = require("fs");
const express = require("express");
const path = require("path");
const http = require("https");
//Internal import
const decorateHtmlRespons = require("../../middlewar/decorateHtmlRespons");
const authGard = require("../../model/authGard");


const router = express.Router();

router.get("/", decorateHtmlRespons("public-post-page"), authGard, (req, res) => {
     console.log(req.user_id)
     res.render("publicPost");
})


module.exports = router;