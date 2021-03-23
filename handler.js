"use strict";
const getConnection = require("./database");
const response = require("./responseFormat");
module.exports.hello = async (req,res) => {
  try {
    var usuario = {
      name: "Juan",
    };

    let connection = await getConnection();
    var newUsuario = await connection.getRepository("Usuario");
    //await newUsuario.save(usuario);
    const encontrados = await newUsuario.find();
    

    console.log(encontrados);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: ' Hubo conexión',
        encontrados
      })
    };
  } catch (err) {
    return {
      err: {
        err,
        code: 410,
        msg: "No se pudo conectar a la base de datos",
      },
    };
  }

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Go Serverless v1.0! Your function executed successfully!',
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };
};
