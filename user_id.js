const { v4: uuidv4 } = require('uuid');



const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
})

let ID = async () => {

    try {
        temp = uuidv4();
        let res = await myDynamo.get({
            TableName: 'User_Profile',
            Key: {
                id: temp
            }
        }).promise()
        console.log("2 gpfi")
        while (res.Item != undefined) {     //check if we get undefined value by searching id or not
            temp = uuidv4();
            res = await myDynamo.get({
                TableName: 'User_Profile',
                Key: {
                    id: temp
                }
            }).promise()
        }
        // will return the uniqueID
        return {
            status: 200,
            data: temp
        }
    }

    catch (e) {
        return {
            status: 409,
            data: null,
            callStatus: "request failed",
            errorMessage: e
        }
    }


}

module.exports = {ID}
