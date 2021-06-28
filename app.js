const express = require('express');
const app = express();
//const userRoutes = require("./routes/userRoutes.routes")

app.get('/',(req,res)=>{
    //res.status(201).send("<h1>Home Page - Get request<\h1>"); 
    res.sendFile("home.html", {root: "./views"});
});

module.exports = app;