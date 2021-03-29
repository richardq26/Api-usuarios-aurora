// const { S3_ID, S3_SECRET_KEY, RDS_REGION } = require("../env.production.json");
const { SES } = require("aws-sdk");

const SES_CONFIG = {
  accessKeyId: "AKIAXUZXT7EXNSXBUKZ7",
  secretAccessKey: "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",
  region: "us-east-1",
};

const AWS_SES = new SES(SES_CONFIG);
exports.sendMail = (recipientEmail) => {
  let params = {
    Source: "richard.sw268@gmail.com",
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "Correo de prueba",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Hola, este es un ejemplo`,
      },
    },
  };

  return AWS_SES.sendEmail(params).promise();
};
