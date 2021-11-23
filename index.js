const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const app = express()
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
var DynamoDBStore = require('connect-dynamodb')({session: session});
app.use(cors({
    origin: "*"
}))
// console.log(passport)
require('dotenv').config()
const AWS = require("aws-sdk")
const myDynamo = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
    region: 'ap-south-1'
})
const dbRouter = require('./Routes/dbRouter')
const { authRoute } = require('./Routes/auth')
const { Passport } = require('passport')
app.use(express.json())
// console.log(Passport)
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    store: new DynamoDBStore({
        table: "sessionStore",
        AWSConfigJSON: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.ACCESS_KEY_SECRET,
            region: 'ap-south-1'
        },
        
    })
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(async (username, password, done)=>{
    try{
        // console.log("in passport use")
        const resp = await myDynamo.get({
            TableName: "UserPool",
            Key: {
                email: username
            }
        }).promise()
        const userObj = resp.Item
        if (userObj == undefined){
            return done(false, null, {message: 'Incorrect username.'})
        }
        let isCorrect = await bcrypt.compare(password, userObj.password)
        if(!isCorrect){
            return done(false, null, {message: 'Incorrect password.'})
        }
        return done(null, userObj)
    }catch(e){
        return done(e)
    }
}))
passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user.ID);
});
  
passport.deserializeUser(async function(id, done) {
    try{
        let user = await myDynamo.query({
            TableName: "UserPool",
            IndexName: "ID-index",
            KeyConditionExpression: 'ID = :id',
            ExpressionAttributeValues: {
              ':id': id,
            //   ':rkey': 2015
            }
        }).promise()
        done(null, user.Items[0])
        
    }catch(e){
        done(e)
    }
})

// const sample = async () => {
//     try{
//         let user = await myDynamo.query({
//             TableName: "UserPool",
//             IndexName: "ID-index",
//             KeyConditionExpression: 'ID = :id',
//             ExpressionAttributeValues: {
//               ':id': '01bda609-97dd-4ebf-bc4a-6f915f1ea32c',
//             //   ':rkey': 2015
//             }
//         }).promise()
//         console.log(user)
//     }catch(e){
//         console.log("error")
//         console.log(e)
//     }
// }

// sample()

// app.use(bodyParser.json())
app.use('/db', dbRouter)
app.use("/auth", authRoute)
app.get("/", (req, res)=>{
    res.send("hello triggered")
})
app.listen(8000)
