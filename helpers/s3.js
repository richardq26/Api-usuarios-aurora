const { S3 } = require("aws-sdk");
const fs = require('fs');
class AWS {
  constructor() {
    this.s3 = new S3({
      accesKeyId: "AKIAXUZXT7EXAEAKPMON",
      secretAccesKey: "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",
    });

    this.bucket = "apicategorias-dev-serverlessdeploymentbucket-1jaarao006y19";
  }

  async uploadFile(body) {
    
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: this.bucket,
        Body: body,
        Key: 'prueba.jpg',
        ACL: "public-read",
      };
      console.log(params);
      this.s3.putObject(params, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log(data)
        return resolve(data);
      });
    });
  }

  getURLfile(time, key) {
    return this.s3.getSignedUrl("getObject", {
      Bucket: this.bucket,
      Key: key,
      Expires: time,
    });
  }

  async deleteFile(key) {
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: this.bucket,
        Key: key,
      };

      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

  getUrlUpload(key, expireSeconds, ContentType) {
    let params = {
      Bucket: this.bucket,
      Key: key,
      ContentType,
      ACL: "public-read",
      Expires: expireSeconds,
    };
    return this.s3.getSignedUrl("putObject", params);
  }

  listObjects = async () => {
    return new Promise((resolve, reject) => {
      var parametros = {
        Bucket: "apicategorias-dev-serverlessdeploymentbucket-1jaarao006y19",
      };
      this.s3.listObjectsV2(parametros, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
    // var parametros = {
    //   Bucket: "apicategorias-dev-serverlessdeploymentbucket-1jaarao006y19",
    // };
    // try {
    //   await this.s3.listObjectsV2(parametros, async (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     }

    //     return await data;
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };
}

let instanceAwsS3 = new AWS();
module.exports = instanceAwsS3;
