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
      var usuarioRepository= await connection.getRepository("pruebaus");
      return await usuarioRepository.save(usuario);
      
      // return await newUsuario.find();
    } catch (error) {
      console.log(error)
      return {
        error,
      };
    }
  }

  async signup(userData){
    try{
      const connection = await getConnection();
      const userRepository = await connection.getRepository("pruebaus");
      let userCreated = await userRepository.save({...userData});
      return userCreated;
    }catch(error){
      console.log(error);
      return {
        error: {
          code: 410,
          message: "Error de conexion con la Base de Datos",
        },
      };
    }
  }
}

const userpruebaService = new UserpruebaService();
module.exports = userpruebaService;
