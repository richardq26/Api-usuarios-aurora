"use strict";
const getConnection = require("./database");
const response = require("./responseFormat");
module.exports.hello = async (req, res) => {
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
        msg: " Hubo conexión",
        encontrados,
      }),
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
};

module.exports.enviar = async (event) => {
  try {
    let connection = await getConnection();
    var us= body.us;
    console.log(us);
    // var nombre = event.queryStringParameters.usuario;
    // var usuario ={
    //   name: nombre
    // }
    // var newUsuario = await connection.getRepository("Usuario");
    // await newUsuario.save(usuario);
    console.log("Guarda al usuario")
    const encontrados = await newUsuario.find();
    console.log("Introduzco al usuario")
    console.log(encontrados)
    return {
      body: JSON.stringify({
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
};
