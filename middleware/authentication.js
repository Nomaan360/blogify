const {validateTokenForUser} =require('../services/authentication')
function checkAuthforUser(cookiename) {
    return(req,res,next)=>{
        let token =req.cookies[cookiename]
        if(!token){
            return next()
        }
        try {
            let payload= validateTokenForUser(token)
            req.user=payload
        } catch (error) {
            
            return res.render('signin')

        }
        return next()

    }
    
}

module.exports={
    checkAuthforUser
}