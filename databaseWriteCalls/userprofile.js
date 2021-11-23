const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
  accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
  secretAccessKey: "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",
  region: "us-east-2"
})

const { ID } = require('../user_id')

let createProfile = async ({ user }) => {
  try {
    const userID = await ID();

    console.log(userID);
    console.log("1 jnfj");
    let res = await myDynamo.put({

      TableName: 'User_Profile',
      Item: {
        "id": userID,
        "address": {
          "pincode": user.pincode,
          "houseNo": user.houseNo,
          "state": user.state,
          "landmark": user.landmark,
          "sector": user.sector,
          "city": user.city
        },
        "contactNo": user.contactNo,
        "DOB": user.DOB,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "gender": user.gender,
        "profilePic": user.profilePic
      }

    }).promise();
    console.log(res)
    console.log("2 gpfi")
    return console.log("promise returned");


  } catch (e) {
    console.log(e)
    return {
      status: 409,
      data: null,
      callStatus: "request failed",
      errorMessage: e
    }
  }
}

createProfile({
  user: {
    id: "userID",
    address: {
      pincode: "12561",
      houseNo: "59854",
      state: "haryana",
      landmark: "hidhei",
      sector: "15",
      city: "delhi"
    },
    contactNo: "58412541",
    DOB: "21/5/12",
    email: "mdsim@gmail.com",
    firstname: "gaurav",
    lastName: "rajput",
    gender: "others",
    profilePic: "nwefi.jpg"
  }
})
module.exports = { createProfile };