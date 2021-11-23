const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
});

let getReviews = async ({id}) =>{
  try{
    let res= await myDynamo.query({
      TableName: "Reviews",
      KeyConditionExpression: "productId = :id",
      ExpressionAttributeValues: {
        ":id": id
      }
    }).promise()
    console.log(res)
    return {
      status:200,
      data:res.Items
    }
  }
  catch(err){
    console.error(err);
    return {
      status: 409,
      data: null,
      callStatus: "request failed",
      errorMessage: err
    }
  }
}
//getReviews({id:"1"})
module.exports={getReviews}
