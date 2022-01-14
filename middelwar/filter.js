const { User} = require("../model/user");
const jwt = require("jsonwebtoken");

 
const filterAdmin =  (req, res, next) => {

    try {
        const token = req.header("x-auth-token");
        const decode = jwt.decode(token)
         if(decode.isAdmin) return next();
         else return res.status(401).json({ message: "un-authorized" })
        
    } catch (error) {
        res.status(401).json({ message: "un-authorized" })
    }
}

module.exports = filterAdmin