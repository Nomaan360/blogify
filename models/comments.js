// const Schema=require('mongoose')
const {createHmac,randomBytes} = require('crypto');
const { Schema, model } = require("mongoose");
const {createTokenForUser,validateTokenForUser}=require('../services/authentication')

const mongoose=require('mongoose');

const Commentchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blog_id:{
        type: Schema.Types.ObjectId,
        ref: "blogs",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
 
},
{timestamp:true})




const Comment=model('comment',Commentchema)
module.exports=Comment