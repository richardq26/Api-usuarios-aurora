class App {
  constructor() {
    this.app = require("lambda-api")();
    this.setRoutes();
  }

  setRoutes() {
    this.app.register(require("./userprueba/userprueba.routes"), {
      prefix: "/user",
    });
  }
}

const Aplication = new App();
module.exports = Aplication.app;
