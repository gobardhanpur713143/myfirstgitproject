// External imports
require("dotenv").config();
const express = require("express");
const cookie_perser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");



// Internal imports
const loginRouter = require("./router/publicRouter/login");
const registerRouter = require("./router/publicRouter/register");
const publicPosts = require("./router/protcetRouter/publicPosts");
const logoutRouter = require("./router/protcetRouter/logout");
const acountRouter = require("./router/protcetRouter/acount");



const app = express();
app.use(express.static(path.join(__dirname,"./public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie_perser(process.env.COOKIE_SECRET))

//View setup
app.set("view engine","ejs");

// mongoose databes conection
mongoose.connect("mongodb://127.0.0.1:27017/sbook").then(() =>{
  console.log("databes conncted")
}).catch((err) => {
  console.log(err)
});

//express router setup
app.use("/user", loginRouter);
app.use("/user", registerRouter);
app.use("/", publicPosts);
app.use("/user", logoutRouter);
app.use("/user", acountRouter);

//404 error handler
app.use((req, res) => {
      res.sendFile(path.join(__dirname, "./public/notfound.html"))
});
//default errorHandler
app.use((err, req, res, next) => {
      res.status(500).json({
        defulterror: err.message
      });
      
})

app.listen(5000, () => {
    console.log("server is running at port 5000");
});