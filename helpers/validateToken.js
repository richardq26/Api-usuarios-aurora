//solo extraemos el payload
const jwt = require("jsonwebtoken");
module.exports =  (token) => {
  const data= jwt.decode(token, { complete: true });
  
  console.log("El token en validateToken fue "+token)
  if(!data){
    return {
      error:{
        code:401,
        message:'Payload no se encontró'
      }
    }
  }
  return {
    payload: data.payload
  };
};
