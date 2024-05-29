import jwt from 'jsonwebtoken'

const authMeddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({
            success:false,
            message:"User Not authorized login again"
        })
    }
    try {
        const token_decode = jwt.verify(token,process.env.jwt_token)
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}
export default authMeddleware;