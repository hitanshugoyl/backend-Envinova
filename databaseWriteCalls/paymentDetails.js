const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})


  let paymentDetails = async ({user})=>{
      try{

        console.log("1 jnfj");
        let date = Date.now().toString();

            let res = await myDynamo.put({

                TableName: 'Payment_Details',
                Item: {
                    "userId" :user.userId,
                    "orderId": user.orderId,
                    "amount" : user.amount,
                    "provider" : user.provider,
                    "paymentStatus" : user.paymentStatus,
                    "createdAt" : date.substring(0,date.length -3)

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

  paymentDetails({
      user: {
          userId : "1234",
          orderId: "4589",
          amount: "100000",
          provider: "arjun mittal",
          paymentStatus: true,
          createdAt: "date"
      }
  })
 
  module.exports = {paymentDetails};