const joi=require('joi');

//logic for signup validation
const signupValidation=async (req,res,next)=>{
    //request comes from client side in the form of object
   const schema=joi.object({
       name : joi.string().min(3).max(100).required(),
       email : joi.string().email().required(),
       password : joi.string().min(3).max(100).required()
   });
   const {error}=schema.validate(req.body);

  if(error){
    return res.status(400).json({message:"Bad Request",error})
  }
  next();
}

const loginValidation=async (req,res,next)=>{
    //request comes from client side in the form of object
   const schema=joi.object({
       email : joi.string().email().required(),
       password : joi.string().min(3).max(100).required()
   });
   const {error}=schema.validate(req.body);

  if(error){
    return res.status(400).json({message:"Bad Request",error})
  }
  next();
}

module.exports={signupValidation,loginValidation};