module.exports ={
    name: 'Usuario',
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name:{
            type: "varchar"
        }
    }
}