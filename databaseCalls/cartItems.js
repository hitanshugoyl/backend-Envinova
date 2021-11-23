const AWS = require('aws-sdk')
const discount =require('./discount');

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: "AKIAQCEPJ2OAS5VAAKXY",
    secretAccessKey: "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",
    region: "us-east-2"
});
// get cart item from userid and productid;
// api name = getCartItemFromUserId
let count=1;
// if item is already added.....get count from getCartItemFromUserId ...them count++
let cartItems = async ({userId,productId}) => {
    try{
        console.log("1 updateCart")
        let res = await myDynamo.put({
            TableName: "Cart_Items",
            Item: {
              "id": userId,
              "productId":productId,
              "count":count,
              "discount":discount(["1"])
            }}).promise()
        console.log("2 updateCart")
        return {
            status: 200,
            data: res.Item
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

updateCart({"1":"2"});
