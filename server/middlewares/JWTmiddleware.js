const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware");

    //logic authorize user
    const token=req.headers["authorization"].split(" ")[1]
    console.log(token);
    if(token){
        //verify
        try {
            const jwtResponse=jwt.verify(token,process.env.JWTPASSWORD)
            console.log("jwt response",jwtResponse);
            req.userId=jwtResponse.userId
            next()
            
        } catch (error) {
            res.status(401).json("authorization failed")
        }
    }else{
        res.status(404).json("authorization failed")
    }
}
module.exports=jwtMiddleware