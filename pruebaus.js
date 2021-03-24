module.exports = {
  name: "Pruebaus",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: "varchar"
    },
    password:{
      type: "varchar"
    },
    email:{
      type: "varchar"
    },
    sub:{
      type: "varchar",
      nullable: true
    }
  },
};
