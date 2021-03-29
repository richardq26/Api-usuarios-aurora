const uuid = require('uuid')
const s3 = require("../../helpers/s3");
module.exports = (payload) =>{

    let urlsPreload = payload.documents.map( (document)=>{
        let key = `${document.type}/${uuid.v1()}`
        let url = s3.getUrlUpload(key, 2*60*60*60, document.contentType)
        return {url,key}
    })
    
    return urlsPreload;

}