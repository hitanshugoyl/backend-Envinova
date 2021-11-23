const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})


// Get the wishlist from userId

let getMyWish = async ({userId}) => {
    try{
        console.log("1 gmw")
        let res = await myDynamo.query({
            TableName: "Wishlist",
            KeyConditionExpression: "userId = :id",
            ExpressionAttributeValues: {
                ":id": userId
            }
        }).promise()
        console.log("2 gmw")
        // console.log(res)
        let arr = res.Items.map(obj=>{
            return obj.productId
        })
        console.log(arr)
        return {
            status: 200,
            data: arr
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

module.exports = {getMyWish}