const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connectToDb,getDb } = require('./db')

const app = express()
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
  

let db

//db-connection --refer db.js
connectToDb((err)=>{
    if(!err){
        app.listen(3000,()=>console.log("SERVER RUNNING ON PORT 3000"));
        db = getDb()
    }
    else{
        console.log("ERROR 404")
    }
})

//routes
app.post("/register",(req,res)=>{
    db.collection('users')
    .insertOne({name:req.body.name,age:req.body.age})
    .then(()=> res.send("Successfully Registered"))
    .catch(err => res.send("Error"))
})