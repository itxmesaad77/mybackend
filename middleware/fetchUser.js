var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser=(req,res,next)=>{
    // get the user from the jwt token add id to the req object
    const token= req.header('auth-token');
    if(!token){
    res.status(400).send({error:"Please authenticate using the  valid toekn"});
    }
    try {
    const data = jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
    } catch (error) {
    res.status(400).send({error:"Please authenticate using the  valid toekn"});
    }
}
module.exports=fetchuser;