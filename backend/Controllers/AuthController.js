const bcrypt = require('bcrypt')
const UserModel = require("../Models/Users");
const jwt=require('jsonwebtoken');
require('dotenv').config();

const signup= async(req,res)=>{
    try{
     const {name,email,password}=req.body;
     const user=await UserModel.findOne({email});
     if(user){
        return res.status(409).json({message:"user already exists",success:false});
     }
     const userModel=new UserModel({name,email,password});
     userModel.password=await bcrypt.hash(password,6);
     await userModel.save();
     res.status(201).json({message:'signup successfully',success:true})
    }
    catch(err){
     res.status(500).json({message:'Internal Server Error',success:false})
    }
}

const login= async(req,res)=>{
    try{
     const {email,password}=req.body;
     const user=await UserModel.findOne({email});
     const error="Email and Password doesn't match";
     if(!user){
        return res.status(403).json({message:error,success:false});
     }
     const isPassEqual=await bcrypt.compare(password,user.password);
     if(!isPassEqual){
                return res.status(403).json({message:error,success:false});
     }

     const jwtToken=jwt.sign({email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
     )

     res.status(201).json({message:'signup successfully',success:true,
        jwtToken,email,name:user.name
     })
    }
    catch(err){
     res.status(500).json({message:'Internal Server Error',success:false})
    }
}

module.exports={signup,login};