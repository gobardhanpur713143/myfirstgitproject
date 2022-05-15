const express = require("express");


const router = express.Router();

router.get("/acount", (req, res) => {
    res.send("hi i am acount page");
});


module.exports = router;