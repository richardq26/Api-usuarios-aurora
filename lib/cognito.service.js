const {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
  CognitoRefreshToken,
  CognitoUserSession,
  CognitoAccessToken,
  CognitoIdToken,
} = require("amazon-cognito-identity-js");

const { CognitoIdentityServiceProvider } = require("aws-sdk");

// Datos que están en mi grupo de usuarios de cognito aws
const poolData = {
  UserPoolId: "us-east-1_urWAO6CX4",
  ClientId: "6ola5d2a9pdl22h54sldakugih",
};
const userPool = new CognitoUserPool(poolData);


exports.Register = async (email, password, name) => {
  return new Promise((resolve, reject) => {
    let username = email;
    let attributeList = [];

    attributeList.push(
      new CognitoUserAttribute({ Name: "email", Value: email })
    );
    attributeList.push(new CognitoUserAttribute({ Name: "name", Value: name }));
    userPool.signUp(
      username,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          return resolve({
            error: err,
          });
        }

        return resolve({
          result,
        });
      }
    );
  });
};

exports.Login = async (body) => {
  return new Promise((resolve, reject) => {
    let userName = body.name;
    let password = body.password;
    let authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: password,
    });

    let userData = {
      Username: userName,
      Pool: userPool,
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        let accesstoken = session.getAccessToken().getJwtToken();
        let idToken = session.getIdToken().getJwtToken();
        let refreshToken = session.getRefreshToken().getToken();
        return resolve({ accesstoken, refreshToken, idToken });
      }//,
      // onFailure: (error) => {
      //   if (error.code == "UserNotConfirmedException") {
      //     resolve({
      //       error: {
      //         status: 403,
      //         message: "Usuario no confirmado",
      //       },
      //     });
      //   }

      //   resolve({
      //     error: {
      //       status: 401,
      //       message: error,
      //     },
      //   });
      // },
    });
  });
};
