const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})

// Get the profile details (naam jaat falana dhikana)

let comments = async ({user}) =>{
    try{
        console.log("1 mpd")
        let res = await myDynamo.get({
            TableName: "Comments",
            Key:{
                "id": userID,
            },
            AttributesToGet: [
                "commentor",
                "comment",
                "dateAndTime"
            ]
        }).promise()
        console.log("2 mpd")
        let arr = res.Items.map(obj=>{
        return  obj.userID
        })
        console.log(arr)
    }

        // return {
        //     status: 200,
        //     data: res.Item
        // }
    catch(err){
        console.log(err)
        return {
            status: 409,
            data: null,
            callStatus: "request failed",
            errorMessage: e
        }
    }
}

module.exports = {comments};