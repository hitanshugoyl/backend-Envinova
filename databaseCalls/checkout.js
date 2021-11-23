const AWS = require('aws-sdk')
const cartItems =require('./cartItems');

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
});

let getCartItems = async (userId) =>{
  try{
    console.log("gcr1");
    let res=myDynamo.get({
      TableName:"Cart_Items",
      Key:{
        "id":id
      }
    }).promise()
    console.log("gcr2");
    return {
      status:200,
      data:res.Items
    }
  }catch(e){
      return {
        status: 409,
        data: null,
        callStatus: "request failed",
        errorMessage: e
      }
    }
}

module.exports = getCartItems;
