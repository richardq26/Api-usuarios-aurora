const userpruebaService = require("./userprueba.service");
const uploadImg = require("./upload.service");
const getUrlPreload = require("./getURLpreload.service");
const { Register, Login } = require("../../lib/cognito.service");
const response = require("../../helpers/responseFormat");
const ses = require("../../lib/ses.service");
const s3 = require("../../helpers/s3");
class UserpruebaController {
  async getusersprueba(req, res) {
    let usersprueba = await userpruebaService.get();
    if (usersprueba.error) {
      return res.json({ msg: "Error" });
    }
    return response(res, 200, usersprueba);
  }

  async createuserprueba(req, res) {
    let userprueba = await userpruebaService.create(req.body);

    return response(res, 200, userprueba);
  }

  async signup(req, res) {
    let cognitoUser = await Register(
      req.body.email,
      req.body.password,
      req.body.name
    );
    if (cognitoUser.error) {
      return response(res, 410, cognitoUser.error);
    }
    req.body.sub = cognitoUser.result.userSub;
    let success = await userpruebaService.signup(req.body);
    if (success.error) {
      return response(res, success.error.code);
    }

    await ses.sendMail(req.body.email);
    console.log(success);
    return response(res, 200, success);
  }

  async login(req, res) {
    let user = await userpruebaService.findUser(req.body.email);
    console.log("Email recibido " + req.body.email);
    if (user.error) {
      return response(res, user.error.code, user.error.message);
    }

    let credentials = await Login({
      name: req.body.email,
      password: req.body.password,
    });

    if (credentials.error) {
      return response(res, credentials.error);
    }

    return response(res, 200, {
      user,
      accessToken: credentials.accesstoken,
      refreshToken: credentials.refreshToken,
      idToken: credentials.idToken,
    });
  }

  async mailprueba(req, res) {
    await ses.sendMail(req.body.email);
    return res.json({ "Se evió el correo a ": req.body.email });
  }

  async uploadImg(req, res) {
    var imagen = await uploadImg(req.body);

    if (imagen.error) {
      return response(res, imagen.error.code, imagen.error);
    }

    return response(res, 200, imagen);
  }

  async listObjects(req, res) {
    var respuesta = await s3.listObjects();
    console.log("La respuesta desde controller es: ");
    console.log(respuesta);
    return res.json({ respuesta });
  }

  async getUrlPreload(req, res) {
    let data = await getUrlPreload(req.body);
    if (data.error) {
      return response(res, data.error.code, data.error.message);
    }
    return response(res, 200, data);
  }
}

const userpruebaController = new UserpruebaController();
module.exports = userpruebaController;
