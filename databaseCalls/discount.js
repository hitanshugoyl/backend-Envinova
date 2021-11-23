const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})

let discount = async({discountArr}) => {

    try{
        console.log("1 gpfi")
        let res = await myDynamo.batchGet({
          RequestItems: {
            "Discount": {
              Keys: discountArr.map(object=>{
                console.log(object);
                return {
                  "code": object.toString(),
                  discoutPercentage:object.two
                }
              })
            }
          }
        }).promise()
        console.log("2 gpfi")
        return {
          status: 200,
          data: res.Responses
        }
      }catch(e){
          console.log(e);
        return {
          status: 409,
          data: null,
          callStatus: "cannot apply",
          errorMessage: e
        }
      }
    }

    discount({discountArr: ["1","2"]});

    module.exports = {discount};

