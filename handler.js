"use strict";

const app = require("./components/app");
const getConnection = require("./database");
module.exports.Server = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event)
  return await app.run(event, context, callback);
};

// module.exports.hello = async (req, res) => {
//   try {
//     var usuario = {
//       name: "Probando desde hello",
//     };
//     let connection = await getConnection();
//     var newUsuario = await connection.getRepository("pruebaus");
//     await newUsuario.save(usuario);
//     const encontrados = await newUsuario.find();
//     console.log(encontrados)
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         msg: " Hubo conexión",
//         encontrados,
//       }),
//     };
//   } catch (err) {
//     return {
//       err: {
//         err,
//         code: 410,
//         msg: "No se pudo conectar a la base de datos",
//       },
//     };
//   }
// };
