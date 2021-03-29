const userService = require("../components/userprueba/userprueba.service");
const validateToken = require("../helpers/validateToken");
const response= require('../helpers/responseFormat');


const authorizer = ()=>async(req, res, next) => {
  let token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    let { payload, error } = isBearerToken(token);
    if (error) {
      response(res, 401, "Token Invalid");
    }
    let user = await userService.findBySub(payload.sub);
   
    if (user.error) {
      response(res, user.error.code, user.error.message);
    }

    req.locals = user;
    next();
  } catch (error) {
    console.log(error)
    response(res, 401, "Token Invalid");
  }
};

const isBearerToken = (token) => {
  try {
    return validateToken(token);
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

module.exports = authorizer;