const joi = require("joi");
const registerModal = require("../model/userModel")
const bcrypt = require("bcrypt");


const registerValidation = async (req, res, next) => {
  const Schema = joi.object({
    name: joi.string().min(3).max(15).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confrim_password: joi.ref("password"),
  });

  try {
    const value = await Schema.validateAsync(req.body);
    if (value) {
      next()
    }



  } catch (err) {
    const fildname = await err.message.split(" ")[0];
    const message = await err.message;
    res.locals.fildname = fildname;
    res.locals.error = message;
    res.locals.data = {
      name: req.body.name,
      email: req.body.email
    }
    res.render("register.ejs")
  }
};
const register = async (req, res) => {
  try {

    const user = await registerModal.findOne({ email: req.body.email });
    if (user) {
      res.locals.comonMessage = "This email are already in use"
      res.render("register")
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newuser = new registerModal({
        name: req.body.name,
        email : req.body.email,
        password : hashPassword
      });

      const saveuser = await newuser.save();
      res.locals.comonMessage = "Siginup successsfully"
      res.render("register")
    }

  } catch (err) {
     res.locals.comonMessage = "Server side error"
     res.render("register")
  }

}



module.exports = {
  registerValidation,
  register
};