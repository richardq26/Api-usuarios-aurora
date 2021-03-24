const getConnection = require("../../database");

class UserpruebaService {
  async get() {
    try {
      const connection = await getConnection();
      const userpruebaRepository = connection.getRepository("userprueba");
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

  async create(data) {
    try {
      const connection = await getConnection();
      const userpruebaRepository = connection.getRepository("userprueba");
      return await userpruebaRepository.insert(data);
    } catch (error) {
      return {
        error: {
          code: 410,
          msg: "Error al conectar con la bd",
        },
      };
    }
  }
}
const userpruebaService = new UserpruebaService();
module.exports = companyService;
