const User=require("../models/User");
const jwt=require("jsonwebtoken");
const secretKey="MilestoneProject";
const bcrypt=require("bcrypt");

const createUser=async(req,res)=>{
    const {username,password,email}=req.body;
    try{
        const userInput=new User({username,password,email});
        const user=await userInput.save();
        const token=jwt.sign({username: user.username,userId:user._id},secretKey);
        return res.status(201).json({message:"user registered successfully",token});
    }catch(err){
        return res.status(401).json({message:"user registering failed",status:"error"});
    }
};
const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    try {
        if(!username || !password){
            return res.status(401).json({message:"username/password cannot be empty",status:"error"});
        }
        const user=await User.findOne({username});
        if(!user){
            return res.status(401).json({message:"username invalid",status:"error"});
        }
        ///pasword matching
        const isPaswordMatch=await bcrypt.compare(password,user.password);
        if(!isPaswordMatch){
            return res.status(401).json({message:"username/password invalid",status:"error"});
        }
        const token=jwt.sign({username: user.username,userId:user._id},secretKey);
        return res.status(201).json({message:"login successfully",token});
    } catch (error) {
        return res.status(401).json({message:"Auth failed",status:"error"});
    }
}

const getuser= async(req,res)=>{
const id=req.body.id;
const user=User.findById(id).select("-password");
return res.status(201).json({user})
}