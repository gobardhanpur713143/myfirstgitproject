// External import
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModal = require("../model/userModel");


const loginValidator = async (req, res, next) => {
    const Schema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    try {
        const value = await Schema.validateAsync(req.body);
        if (value) {
            next();
        }
    } catch (err) {
        const fildname = await err.message.split(" ")[0];
        const message = await err.message;
        res.locals.fildname = fildname;
        res.locals.error = message;
        res.locals.data = {
            
            email: req.body.email
        }
        res.render("login")
    }
};

const login = async(req, res) => {
     const {email, password} = req.body;
     const registerUser = await userModal.findOne({email:email});
     if(registerUser){
            const user = await bcrypt.compare(password, registerUser.password);
            if(user){
                  const token = await jwt.sign({user_id : registerUser._id}, process.env.JWT_TOKEN_SECRET, {expiresIn:1000000});
                  res.cookie("token",token,{maxAge:1000000, httponly:true});
                  res.locals.comonMessage = "Login successfully!"
                 
                  res.redirect("/");
            }else{
                res.locals.comonMessage = "Login faild try again!"
                res.render("login");
            }
     }else{
        res.locals.comonMessage = "Login faild try again!"
        res.render("login");
     }
}

module.exports = {
    loginValidator,
    login
}