const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})


  let orderDetails = async ({user})=>{
      try{
        let date = Date.now().toString();
        console.log("1 jnfj");
            let res = await myDynamo.put({

                TableName: 'Order_Details',
                Item: {
                    "userId" :user.userId,
                    "orderId": user.orderId,
                    "address" : user.address,
                    "discountId" : user.discountId,
                    "numberOfItems" : user.numberOfItems,
                    "paymentId" : user.paymentId,
                    "totalAmount" : user.totalAmount,
                    "paymentStatus" : user.paymentStatus,
                    "shippingStatus" : user.shippingStatus,
                    "orderTime" : date.substring(0,date.length -3)
                    


                 }

            }).promise()
            console.log("2 gpfi")
            return {
              address: 200,
              data: res.Responses
            }

      }
      catch(e){
        return {
            address: 409,
            data: null,
            callStatus: "request failed",
            errorMessage: e
        }
      }
  }

 
  module.exports = {orderDetails};