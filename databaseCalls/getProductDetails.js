const AWS = require('aws-sdk')
require('dotenv').config()

const myDynamo = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY_SECRET,
  region: "us-east-2"
})


// Get Product details from a single id
let getProduct = async ({id}) =>{
  try{
    console.log(id)
    let res = await myDynamo.get({
      TableName: "Product_Details",
      Key: {
        "id": "NOVADMIG0001"
      }
    }).promise()

    return {
      status: 200,
      data: res.Item
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

// Get product details from an array of rpoduct ids
let getProductsFromIds = async ({idArr}) =>{
  try{
    console.log("1 gpfi")
    let res = await myDynamo.batchGet({
      RequestItems: {
        "Product_Details": {
          Keys: idArr.map(object=>{
            return {
              "id": object.productId
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
    return {
      status: 409,
      data: null,
      callStatus: "request failed",
      errorMessage: e
    }
  }
}

// Get Product CategoryWise
let getProductFromCategory = async (category) => {
  try{
    console.log('1 gpfc')
    let res = await myDynamo.scan({
      TableName: category,
    }).promise()
    return {
      status: 200,
      data: res.Items
    }
  }catch(e){
    return {
      status: 400,
      message: "internal error",
      errorMsg: e,
      data: null
    }
  }
}


// Get all products with limit 5

let getAllProducts = async ({categoryArr, limit}) =>{
  try{
    console.log("1 gap");
    
    let pArr = categoryArr.map(category => {
      return myDynamo.scan({
        TableName: category,
        Limit: parseInt(limit),
      }).promise()
    })
    console.log(pArr)
    console.log("here")
    let res = await Promise.all(pArr)
    res.forEach(obj=>console.log(obj.Items))
    // console.log(res.forEach(obj=>{return obj.Items}))
    return {
      status: 200,
      data: res
    }
  }catch(e){
    return e
  }
}
// getAllProducts({
//   categoryArr: ["DECOR", "ESSENTIALS", "STATIONERY", "KITCHEN"],
//   limit: 4
// })


module.exports = {getProductsFromIds, getProduct, getAllProducts, getProductFromCategory}