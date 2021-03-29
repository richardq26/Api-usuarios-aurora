const authorizer = require("../../middlewares/authorizer");
const documentController = require("./document.controller");

module.exports = (api, opts) => {
  //api.get("/listobjects", documentController.listObjects);

  api.post("/upload", documentController.uploadFile);

  api.post("/getUrlPreload", documentController.getUrlPreload);
};
