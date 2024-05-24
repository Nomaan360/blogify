// const Schema=require('mongoose')
const {createHmac,randomBytes} = require('crypto');
const { Schema, model } = require("mongoose");
const {createTokenForUser,validateTokenForUser}=require('../services/authentication')

const mongoose=require('mongoose');

const Blogschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    blog_img:{
        type:String,
        required:true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
 
},
{timestamp:true})




const Blog=model('blogs',Blogschema)
module.exports=Blog