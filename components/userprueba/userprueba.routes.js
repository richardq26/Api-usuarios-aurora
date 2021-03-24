const userpruebaController = require("./userprueba.controller");

module.exports=(api,opts)=>{
    api.get("/", userpruebaController.getusersprueba);

    api.post("/", userpruebaController.createuserprueba);
    
    api.post("/signup", userpruebaController.signup);
}