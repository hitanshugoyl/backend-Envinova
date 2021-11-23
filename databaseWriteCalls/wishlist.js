const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
  accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
  secretAccessKey: "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",
  region: "us-east-2"
})

let wishlist = async ({user}) => {
    try {
     
      console.log("1mlkmf");
      let res = await myDynamo.put({
        TableName: 'Wishlist',
        Item: {
          "userId": user.userID,
          "productId": user.productID,
        }
      }).promise()
      console.log(res)
      console.log("2 gpfi")
      return {
        status: 200,
        data: res.Responses
      }
  
  
    }
    catch (e) {
      console.log(e)
      return {
        status: 409,
        data: null,
        callStatus: "request failed",
        errorMessage: e
      }
    }
  }

  // wishlist({user: {
  //   userID: "12",
  //   productID: "ascac"
  // }})

  module.exports = {wishlist};