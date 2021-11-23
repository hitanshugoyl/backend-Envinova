const express = require('express')
const dbRouter = express.Router()
const AWS = require('aws-sdk')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
    region: "us-east-2"
})


// ----------------------------------------------------------------------------------------------------------------------------------------------

//  for getting the FAQs
const getFaqs = require('../databaseCalls/faq')
dbRouter.get('/faqs', async (req, res) => {
    try{
        console.log("hehe")
        res.json(await getFaqs())
    }catch(e){
        return "error occoured with the call or in execution"
    }
})


// ----------------------------------------------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------------------------------------


// For getting the profile Apis
const {myProfileAddresses, myProfileDetails} = require('../databaseCalls/profileCalls')
dbRouter.get('/profiledetails', async (req, res) => {
    try{
        // console.log("hehe in here")
        console.log(req.body)
        let result = await myProfileDetails({userId: req.body.userId})
        console.log(result)
        res.json(result)
    }catch(e){
        // return "error occoured with the call or in execution"
        res.send("error occoured with the call or in execution")
    }
})


dbRouter.get('/profileaddress', async (req, res) => {
    try{
        console.log(req.body)
        res.json(await myProfileAddresses({userId: req.body.userId}))
    }catch(e){
        return "error occoured with the call or in execution"
    }
})


// ----------------------------------------------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------------------------------------------------


// For getting the Products and all
const {getProduct, getAllProducts, getProductFromCategory, getProductsFromIds} = require('../databaseCalls/getProductDetails')
    // Get a single product with product id
dbRouter.post("/getProduct", async (req, res)=>{
    try{
        console.log(req.body)
        
        let resp = await getProduct({
            id: req.body.ID
        })

        res.json({
            status: 200,
            data: resp
        })
        
    }catch(e){
        console.log(e)
        res.json({
            status: 409, 
            errorMessage: e
        })
    }
})
// Get product list form catehory array and limit
dbRouter.post("/getProductList", async (req, res)=>{
    // in body of request we need and array of category and then the limit for products needed at front
    try{
        // body will have 2 parameter categories(array) and limit 
        let resp = await getAllProducts({
            categoryArr: req.body.categories,
            limit: req.body.limit
        })
        res.json({
            status: 200,
            data: resp.data
        })
    }catch(e){
        res.json({
            status: 409,
            message: "internal server error",
            errorMessage: e
        })
    }
})
// Get cart Item ids from the product ID array
dbRouter.post('/getMyCartItemIds', async (req, res)=>{
    try{
        const { idArr }= req.body
        let resp = await getProductsFromIds({idArr})
        res.json({
            status: 200,
            data: resp.data
        })
    }catch(e){
        return {
            status: 410,
            errorMessage: e
        }
    }
})

dbRouter.post('/getThisCategory', async (req, res)=>{
    try{
        const { category }= req.body
        let resp = await getProductFromCategory(category)
        res.json({
            status: 200,
            data: resp.data
        })
    }catch(e){
        return {
            status: 410,
            errorMessage: e
        }
    }
})


// ----------------------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------------------------------

// For getting the Cart Items by userId

const {myProfileCart} = require("../databaseCalls/profileCalls")
dbRouter.post('/getCartItems', async (req, res)=>{
    try{
        const { userId }= req.body
        let resp = await myProfileCart({userId})
        res.json({
            status: 200,
            data: resp.data
        })
    }catch(e){
        return {
            status: 410,
            errorMessage: e
        }
    }
})

// ----------------------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------------------------------

const {getReviews} = require("../databaseCalls/reviewsComment")

dbRouter.post('/getReviewsAndComments', async (req, res)=>{
    try{
        const { id }= req.body
        let resp = await getReviews({userId})
        res.json({
            status: 200,
            data: resp.data
        })
    }catch(e){
        return {
            status: 410,
            errorMessage: e
        }
    }
})






module.exports = dbRouter