const userpruebaController = require("./userprueba.controller");
const authorizer = require("../../middlewares/authorizer");

module.exports=(api,opts)=>{
    api.get("/", authorizer(),userpruebaController.getusersprueba);

    api.post("/", userpruebaController.createuserprueba);
    
    api.post("/signup", userpruebaController.signup);

    api.post("/login", userpruebaController.login);

    api.post("/mailprueba", userpruebaController.mailprueba);

    api.get("/listobjects", userpruebaController.listObjects);

    api.post("/uploadimg", userpruebaController.uploadImg);

    api.post("/getUrlPreload", userpruebaController.getUrlPreload);
}