const s3 = require("../../helpers/s3");

const getConnection = require("../../database");

module.exports = async(data) => {
  try {
    const connection = await getConnection();
    const imagenRepository = connection.getRepository("imagenes");
    if(data){
      await s3.uploadFile(data.img);
    }

    let img = await imagenRepository.save({name: data.img});

    return img;

    
  } catch (error) {
    console.log(error);
    return {
      error: {
        error,
      },
    };
  }
};
