const {Router}=require('express')
const multer=require('multer')
const path=require('path')
const Blog=require('../models/blogs')
const Comment=require('../models/comments')
const router=Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null,filename)
    }
  })
  
  const upload = multer({ storage: storage })
router.get('/addNew',(req,res)=>{
    return res.render('addBlog',{
        user: req.user,
    })

})
router.get('/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
    try {
     
        // Find the blog by its ObjectId
        const blog = await Blog.findById(blogId).populate('createdBy');
        const comments = await Comment.find({blog_id:blogId}).populate('createdBy');
        console.log(blog);
        console.log('coms',comments);
        // Render the view with the blog data
        return res.render('viewblog', {
            user: req.user,
            blog,
            comments
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});


router.post('/comment/:blogId',async(req,res)=>{
    console.log('ewrwe');
    console.log('zxc',req.user._id);
    console.log('cx',req.params.blogId);

    await Comment.create({
        content:req.body.cmt,
        blog_id:req.params.blogId,
        createdBy:req.user._id
    })

    return res.redirect(`/blog/${req.params.blogId}`)
})
router.post('/',upload.single('pimage'),async(req,res)=>{
    const { title,description,pimage}=req.body
    console.log(req.body);
    console.log(req.file);
    await Blog.create({
        title,
        description,
        blog_img:`uploads/${req.file.filename}`,
        createdBy:req.user._id
    })
    return res.redirect('/')

})
module.exports=router