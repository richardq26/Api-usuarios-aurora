const buildMessage = (code,message)=>{
    if(code == 200){
      return message
    }
    return {
      errors:{
        message
      }
    }
  }
  
  module.exports=(res,statusCode,response)=>{
      return res
        .cors()
        // .header("X-XSS-Protection", "1; mode=block")
        // .header("X-Content-Type-Options", "nosniff")
        // .header("Referrer-Policy", "no-referrer-when-downgrade")
        // .header("X-Frame-Options", "SAMEORIGIN")
        // .header(
        //   "Strict-Transport-Security",
        //   "max-age=31536000; includeSubDomains"
        // )
        .status(statusCode)
        .json(buildMessage(statusCode,response));
  }