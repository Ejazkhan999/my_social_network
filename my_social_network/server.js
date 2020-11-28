var express = require('express');
var app = express();
var formidable = require("express-formidable");
app.use(formidable());
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/Edureka';

var mongoClient = mongodb.MongoClient;
var objectid = mongodb.ObjectID;

var http = require("http");
var bcrypt = require("bcrypt");
var filesystem = require('fs');

var jwt = require('jsonwebtoken');

var accesstokensecret = "MyaccessToken1234455678";

app.use("/public" , express.static(__dirname +"/public"));
app.set("view engine" , "ejs");

var socketIO = require("socket.io")(http);
var socketID = "";
var users = [];

 var mainurl = "http://localhost:3000";
 socketIO.on("connection" , function(socket){
     console.log("user  connected " , socket.id);
     socketID = socket.id;

 })

app.listen(3000 , ()=>{
    console.log("connected on 300 port")
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true} , (error)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log('db connected successfully ')
        }
    });
    
    //Get the default connection
    var db = mongoose.connection;
    
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
})