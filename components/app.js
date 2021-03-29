const bodyparser = require("body-parser");
class App {
  constructor() {
    this.app = require("lambda-api")();
    this.setRoutes();
  }

  setRoutes() {
    this.app.register(require("./userprueba/userprueba.routes"), {
      prefix: "/user",
    });
    this.app.register(require("./document/document.routes"), {
      prefix: "/document",
    });

    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: false }));
  }
}

const Aplication = new App();
module.exports = Aplication.app;
