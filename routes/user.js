const {Router}=require('express')
const User=require('../models/users')
const {createTokenForUser,validateTokenForUser}=require('../services/authentication')
const router=Router();
const multer=require('multer')
const path=require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/users/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null,filename)
    }
  })
  
const upload = multer({ storage: storage })

router.get('/signin',(req,res)=>{
    return res.render('signin')

})
router.get('/signuppage',(req,res)=>{
    return res.render('signup')

})
router.get('/logout',(req,res)=>{
    // return res.render('signup')
    res.clearCookie('token')
    res.redirect('/')
})
router.post('/signup',upload.single('uimage'), async(req,res)=>{
   const { fullname,email,password}=req.body
   console.log(req.body);
   await User.create({
    fullname,
    email,
    pic:`users/${req.file.filename}`,
    password
   })
   return res.redirect('/')
})
router.post('/signin',async(req,res)=>{
    const {email, password }= req.body;
    try {
        let token=await User.matchPassword(email,password)
        return res.cookie('token',token).redirect('/')
    } 
    catch (error) {
        return res.render('signin',{
            error :"incorrect password or email"
        })
    }

})
module.exports=router