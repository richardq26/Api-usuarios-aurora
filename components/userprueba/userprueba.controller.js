const userpruebaService = require("./userprueba.service");

class UserpruebaController{
    async getusersprueba(req,res){
        let usersprueba= await userpruebaService.get();
        if(usersprueba.error){
            return res.json({msg: 'Error loko'})
        }
        return res.json(usersprueba);
    }
}

const userpruebaController = new UserpruebaController();
module.exports = userpruebaController()