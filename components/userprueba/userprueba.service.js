const { CloudWatchLogs } = require("aws-sdk");
const getConnection = require("../../database");

class UserpruebaService {
  async get() {
    try {
      const connection = await getConnection();
      const userpruebaRepository = connection.getRepository("pruebaus");
      return await userpruebaRepository.find();
    } catch (error) {
      return {
        error: {
          code: 410,
          msg: "Error al conectar con la bd",
        },
      };
    }
  }

  async create(usuario) {
    try {
      // var usuario={
      //   name:'Jose'
      // }
      let connection = await getConnection();
      var usuarioRepository = await connection.getRepository("pruebaus");
      return await usuarioRepository.save(usuario);

      // return await newUsuario.find();
    } catch (error) {
      console.log(error);
      return {
        error,
      };
    }
  }

  async signup(userData) {
    try {
      const connection = await getConnection();
      const userRepository = await connection.getRepository("pruebaus");
      let userCreated = await userRepository.save({ ...userData });
      return userCreated;
    } catch (error) {
      console.log(error);
      return {
        error: {
          code: 410,
          message: "Error de conexion con la Base de Datos",
        },
      };
    }
  }

  async findUser(email) {
    try {
      const connection = await getConnection();

      const userRepository = connection.getRepository("pruebaus");

      let findLogic = {
        where: { email },
      };

      let user = await userRepository.findOne({email: email});
      console.log('Email que estamos buscando: '+ email);
      console.log(user);
      if (!user) {
        return { error: { code: 401, message: "Usuario no encontrado" } };
      }
      return user;
    } catch (error) {
      console.log(error);
      return {
        error: {
          error,
          code: 410,
          message: "Error de conexion con la Base de Datos",
        },
      };
    }
  }

  async findBySub(sub) {
    try {
      const connection = await getConnection();
      const userRepository = connection.getRepository("pruebaus");
      let user = await userRepository.findOne({
        where: { sub }
      });

      if (!user) {
        return { error: { code: 404, messsage: "User not fount" } };
      }

      return user;
    } catch (error) {
      return {
        error: {
          code: 410,
          message: error,
        },
      };
    }
  }
}

const userpruebaService = new UserpruebaService();
module.exports = userpruebaService;
