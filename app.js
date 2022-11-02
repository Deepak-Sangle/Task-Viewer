require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require("express-session");
const PORT = process.env.PORT || 3000;

//Database Connection
mongoose.connect(process.env.MONGOURI);

mongoose.connection.on('connected',()=>{
    console.log("Database connection On");
});
mongoose.connection.on('error',(err)=>{
    console.log("Error Connecting: ", err);
});

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

//Route Requests
app.use(require('./routes/tasks'));

app.use((req,res,next)=>{
    res.send("EROR 404 PAGE NOT FOUND");
});
//App Listening on port
app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
});