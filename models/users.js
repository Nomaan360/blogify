// const Schema=require('mongoose')
const {createHmac,randomBytes} = require('crypto');
const { Schema, model } = require("mongoose");
const {createTokenForUser,validateTokenForUser}=require('../services/authentication')

const mongoose=require('mongoose');

const Userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default: "/images/default.png",

    },
    role:{
        type:String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
},
{timestamp:true})

Userschema.pre('save',function (next){
    const user=this
    if(!user.isModified('password')) return
    const salt='somerandopmnum'
    const hashpass=createHmac('sha256',salt)
    .update(user.password)
    .digest('hex');
    this.salt=salt
    this.password=hashpass
    next()
})

Userschema.static("matchPassword",async function (email, password) {
    const user =await this.findOne({ email });
    if (!user) throw new Error("User Not found");

    const salt=user.salt
    const hashpass=user.password

    const userpass=createHmac('sha256',salt)
    .update(password)
    .digest('hex');

    if(userpass!==hashpass)
        throw new Error("Incorrect Password");
    let token= createTokenForUser(user)
    return token

});




const User=model('user',Userschema)
module.exports=User