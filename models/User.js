const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
 const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 25,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 5,
    },
    later:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    },
],
    resetPasswordToken: String,
    resetPasswordExpire: String,
    
 },{timestamps}
 );

 // Pre-save hook to hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  });

  module.exports=mongoose.model("User",userSchema);