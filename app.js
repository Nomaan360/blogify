require('dotenv').config()

const express=require('express')
const userRolute=require('./routes/user')
const blogRolute=require('./routes/blog')
const status=require('express-status-monitor')
const Blog=require('./models/blogs')
const pino = require('pino');
const logger = pino({ level: 'info' });

const app=express();
const path=require('path')
const mongoose =require('mongoose')
const cookieparser =require('cookie-parser')
const {checkAuthforUser}=require('./middleware/authentication')
const port= process.env.PORT || 8000
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const transport = new transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const loger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    transport
  ]
});
const loggers = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});
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
    logger.info('msg from pino');
logger.error('err from pino');
console.log('re');
loggers.info('msg from winston');
loggers.error('err from winston');

loger.info('winston-daily-rotate-file');

    const allblogs=await Blog.find({})
      return res.render('home',{
          user :req.user,
          blogs:allblogs
      })
  })
app.use('/user',userRolute)
app.use('/blog',blogRolute)
app.listen(port,()=>console.log('werwr'));