const documentService = require("./services");
const response = require("../../helpers/responseFormat");

class DocumentController {

  async uploadFile(req, res) {
    // let { id } = req.params;
    let data = await documentService.uploadFiles(id, req.body);
    if (data.error) {
      return response(res, data.error.code, data.error.message);
    }
    return response(res, 200, data);
  }

  async getUrlPreload(req, res) {
    let data = await documentService.getUrlPreload(req.body);
    if (data.error) {
      return response(res, data.error.code, data.error.message);
    }
    return response(res, 200, data);
  }

}

const documentController = new DocumentController();
module.exports = documentController;
