const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})


  let discount = async ({user})=>{
      try{

        console.log("1 jnfj");
            let res = await myDynamo.put({

                TableName: 'Discount',
                Item: {
                    "code" :user.code,
                    "name": user.name,
                    "status" : user.status,
                    "discountPercentage" : user.discountPercentage,
                    "discountDescription" : user.discountDescription
                    


                 }

            }).promise()
            console.log("2 gpfi")
            return {
              status: 200,
              data: res.Responses
            }

      }
      catch(e){
        return {
            status: 409,
            data: null,
            callStatus: "request failed",
            errorMessage: e
        }
      }
  }

 
  module.exports = {discount};

// email = goyalhitanshu24@gmail.com
//timestamp= 65168546546821
//

//shu246841

//

