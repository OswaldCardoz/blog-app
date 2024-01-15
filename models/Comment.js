const mongoose=require("mongoose");
const User=require("./User");
const Blog =require("./Blog");
 const commentSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type: String,
    },
    like:Number,
    isNested:Boolean,
    parentComment:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    comments:[this],
    
 },{timestamps}
 );
 module.exports=mongoose.model("Comment",commentSchema);