module.exports = {
  name: "Imagenes",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name:{
      type: "varchar",
      default: 'img'
    }
  },
};
