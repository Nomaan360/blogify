require('dotenv').config()

const express=require('express')
const userRolute=require('./routes/user')
const blogRolute=require('./routes/blog')
const status=require('express-status-monitor')
const Blog=require('./models/blogs')

const app=express();
const path=require('path')
const mongoose =require('mongoose')
const cookieparser =require('cookie-parser')
const {checkAuthforUser}=require('./middleware/authentication')
const port= process.env.PORT || 8000
app.use(express.urlencoded ({ extended: false }));
app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(cookieparser())
app.use(status())
app.use(checkAuthforUser('token'))
app.use(express.static(path.resolve('./public'))); //Serves resources from public folder

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(() =>
    console.log("Mongodb connected")
  );
  app.get('/',async(req,res)=>{
    const allblogs=await Blog.find({})
      return res.render('home',{
          user :req.user,
          blogs:allblogs
      })
  })
app.use('/user',userRolute)
app.use('/blog',blogRolute)
app.listen(port,()=>console.log('werwr'));