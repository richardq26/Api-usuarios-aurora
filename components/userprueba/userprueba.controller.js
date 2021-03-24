const userpruebaService = require("./userprueba.service");
const {Register} = require("../../lib/cognito.service");
const response=require('../../helpers/responseFormat')
class UserpruebaController{
    async getusersprueba(req,res){
        let usersprueba= await userpruebaService.get();
        if(usersprueba.error){
            return res.json({msg: 'Error'})
        }
        return response(res,200, usersprueba);
    }

    async createuserprueba(req,res){
        
        let userprueba= await userpruebaService.create(req.body);
        
        return response(res,200,userprueba)
    }

    async signup(req,res){
        let cognitoUser = await Register(
            req.body.email, req.body.password, req.body.name
        )
        if(cognitoUser.error){
            return response(res,410, cognitoUser.error);
        }
        req.body.sub = cognitoUser.result.userSub;
        let success = await userpruebaService.signup(req.body);
        if(success.error){
            return response(res, success.error.code)
        }
        console.log(success);
        return response(res,200, success);
    }

    
}

const userpruebaController = new UserpruebaController();
module.exports = userpruebaController;