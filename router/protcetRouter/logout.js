const express = require("express");

const router = express.Router();

router.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.redirect("/user/login")
});

module.exports = router;

