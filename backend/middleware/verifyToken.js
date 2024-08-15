const jwt = require("jsonwebtoken");
const models = require("../models");

function verifyToken(req,res,next){

	    try{
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token,'secret');
        req.userData = decodedToken;
        next();
  		  }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }

}

module.exports = {
	verifyToken:verifyToken
}