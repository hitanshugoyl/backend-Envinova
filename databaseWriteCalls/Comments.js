const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})


  let Comments = async ({user})=>{
      try{

        console.log("1 jnfj");
        let date = Date.now().toString();

            let res = await myDynamo.put({

                TableName: 'Comments',
                Item: {
                    "userId" :user.userId,
                    "productId": user.productId,
                    "comment" : user.comment,
                    "commentor" : user.commentor,
                    "date&time" : date.substring(0,date.length -3)

                 }

            }).promise()
            console.log("2 gpfi")
            return {
              amount: 200,
              data: res.Responses
            }

      }
      catch(e){
        return {
            amount: 409,
            data: null,
            callStatus: "request failed",
            errorMessage: e
        }
      }
  }

  Comments({
      user: {
          userId : "1234",
          productId: "4589",
          comment: "100000",
          commentor: "arjun mittal",
          createdAt: "date"
      }
  })
 
  module.exports = {Comments};