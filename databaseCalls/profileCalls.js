const AWS = require("aws-sdk");

const myDynamo = new AWS.DynamoDB.DocumentClient({
  accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
  secretAccessKey: "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",
  region: "us-east-2",
});

// Get the profile details (naam jaat falana dhikana)
let myProfileDetails = async ({ userId }) => {
  try {
    console.log("1 mpd");
    let res = await myDynamo
      .get({
        TableName: "User_Profile",
        Key: {
          id: userId,
        },
        AttributesToGet: [
          "firstName",
          "lastName",
          "email",
          "contactNo",
          "gender",
          "DOB",
          "profilePic",
        ],
      })
      .promise();
    console.log("2 mpd");
    console.log(res);

    return {
      status: 200,
      data: res.Item,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 409,
      data: null,
      callStatus: "request failed",
      errorMessage: e,
    };
  }
};

// Get my profile address
let myProfileAddresses = async ({ userId }) => {
  try {
    console.log("1 mpd");
    let res = await myDynamo
      .get({
        TableName: "User_Profile",
        Key: {
          id: userId,
        },
        AttributesToGet: ["address"],
      })
      .promise();
    console.log(res.Item);
    console.log("here");

    return {
      status: 200,
      data: res.Item ? res.Item : null,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 409,
      data: null,
      callStatus: "request failed",
      errorMessage: err,
    };
  }
};

// Fetch the cart details from userId
let myProfileCart = async ({ userId }) => {
  try {
    console.log("1 mpc");
    let res = await myDynamo
      .query({
        TableName: "Cart_Items",
        KeyConditionExpression: "userId = :id",
        ExpressionAttributeValues: {
          ":id": userId,
        },
        ScanIndexForward: false,
      })
      .promise();
    return {
      status: 200,
      data: res.Items,
    };
  } catch (e) {
    return {
      status: 409,
      data: null,
      callStatus: "request failed",
      errorMessage: err,
    };
  }
};

module.exports = { myProfileAddresses, myProfileDetails, myProfileCart };
