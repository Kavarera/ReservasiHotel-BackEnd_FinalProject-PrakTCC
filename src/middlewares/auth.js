const jwt = require('jsonwebtoken');

const verifyToken = async(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,employee)=>{
        if(err){
            return res.sendStatus(403);
        }
        req.employee=employee;
        next();
    })
}



module.exports = verifyToken;