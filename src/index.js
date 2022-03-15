const express = require("express")
const app=express()
app.use(express.json())
const userControllers = require("./controllers/user.controllers")


app.use("/user",userControllers)


module.exports=app;