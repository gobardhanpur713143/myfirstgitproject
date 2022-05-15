// Module import
const jwt = require("jsonwebtoken");


const authGard = async(req, res, next) => {
          const token = req.cookies.token;
          if(token){
            const chekedtokin = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            console.log(chekedtokin)
            if(chekedtokin){
                res.locals.user = true;
                req.user_id = chekedtokin.user_id;
                next();
         } else{
            res.redirect("user/login");
        }
          }else{
            res.redirect("user/login");
          }
         
         
};
module.exports = authGard;