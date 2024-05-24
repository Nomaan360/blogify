const JWT = require("jsonwebtoken");
const secret = "$uperMan@123";
function createTokenForUser(user) {
    const payload ={
        _id: user._id,
        fullname:user.fullname,
        email: user.email,
        pimage: user.pic,
        role: user.role,
    }
    const token=JWT.sign(payload,secret)
    return token
}
function validateTokenForUser(token) {
   
    const payload=JWT.verify(token,secret)
    return payload
}
module.exports={
    createTokenForUser,validateTokenForUser
}