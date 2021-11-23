const express = require('express')
const authRoute = express.Router()
const AWS = require('aws-sdk')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const e = require('express')
const passport = require('passport')
const {ID} = require('../user_id')

const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
    region: 'ap-south-1'
})
// function to check token
// const checkSignIn = (req,res,next) => {
//     let token = req.body.secret_key;
//    console.log({token:token})
//     if (!token || token === '') {
//       console.log('No Secret key provided');
//       res.send({msg:'505 Internal Error',variant:'danger'});
//     }else{
//     jwt.verify(token,'secrethaibhai',(e,r)=> {
//       if(e){
//        console.log('Not matched')
//       }else{
//         next()
//       }
//     })
//   }
//   }
  //end of fn to check headers
  // fn for cors block , now allow to everyone
//   authRoute.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader("Content-Type",'application/json');
//     // Pass to next layer of middleware
//     next();
//   });
  // end of cors fn..

authRoute.get("/signIn",(req,res,next)=>{
    res.json({msg:'hey i am working from sign in'})
})

authRoute.post("/login", passport.authenticate('local'),async (req,res,next)=>{
    try{
        console.log("inside req")
        const {body} = req
        console.log(req.session)
        console.log(req._passport)
        console.log(req.user)
        console.log("reached here")
        res.send(req.user)
    }catch(e){
        console.log(e)
    }
})

authRoute.get("/signUp",(req,res,next)=>{
    res.json({msg:'hey i am signup section'})
})

authRoute.post("/signup", async (req,res,next)=>{
    // will recieve firstName lastName Mobile emailid and password in body
    try{
    const {firstName, lastName, contact_no, email, password} = req.body
    const hashedKey = await bcrypt.hash(password, 10)
    const id = await ID()
    console.log(id)
    console.log(req.body)
    const userBody = {
        email: email,
        password: hashedKey,
        id: id.data,
        firstName: firstName,
        lastName: lastName,
        contactNo: contact_no
    }
    const result = await saveUser(userBody)
    console.log(result)
    if(result == 400){
        throw 400
    }
    res.json({
        message: "profile created successfully"
    })
    }catch(err){
        console.log(err)
        res.json({
            message: "error in creating profile"
        })
    }
    next();
})




const saveUser = async (user) => {
    try{
        const {email, password, id} = user;
        const saveQuery = await myDynamo.put({
            TableName: "UserPool",
            Item: {
                email: email,
                password: password,
                ID: id
            }
        }).promise()
        // const res = await saveQuery.promise()
        // console.log(res)
        return 200
    }catch(e){
        console.log("error here")
        console.log(e)
        return 400
    }
}


const getUser = async (user)=>{
    try{
        const {email} = user
        var params = {
            TableName: 'UserPool',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
              ':email': email,
            }
        }
        const getQuery = await myDynamo.query(params).promise()
        // const {email, password} = getQuery.Items[0]
        return getQuery.Items[0]
    }catch(e){
        console.log(e)
        return null;
    }
}



module.exports = {authRoute, saveUser, getUser, myDynamo}