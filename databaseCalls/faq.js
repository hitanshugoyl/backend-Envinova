const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})


// Get Faqs 
let getFaqs = async () => {
    try{
        let response = await myDynamo.query({
           TableName: "FAQs",
           KeyConditionExpression: "sno = :sno",
           ExpressionAttributeValues: {
               ":sno": 1
           },
        }).promise()
        console.log(response)
        console.log("here")
        return {
            status: 200,
            data: response.Items
        }


    }catch(e){
        console.log(e)
        
        return {
            status: 409,
            data: null,
            callStatus: "request failed",
            errorMessage: e
        }

    }
}

module.exports = {getFaqs};




