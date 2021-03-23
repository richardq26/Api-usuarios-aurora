const typeorm = require("typeorm");
const EntitySchema = typeorm.EntitySchema;

let connection;
module.exports = async () => {
  let start = new Date().getTime();
  if(connection){
      return connection;
  }
  connection = await typeorm.createConnection({
    type: "aurora-data-api",
    database: "pruebausuarios",
    secretArn: "arn:aws:secretsmanager:us-east-1:525713275182:secret:pruebausuarios-hVIhKL",
    resourceArn: "arn:aws:rds:us-east-1:525713275182:cluster:pruebausuarios",
    region: "us-east-1",
    synchronize: true,
    entities:[
      new EntitySchema(require("./usuario"))
    ]
  });


  let end = new Date().getTime();
  console.log('Tiempo de conexión', end-start);

  return connection;
};
