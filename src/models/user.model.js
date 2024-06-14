import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true , "username is required"],
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:[true , "email is required"],
        unique:true,
        trim:true
    },
    fullName:{
        type:String,
        required:[true , "full name is required"],
        trim:true
    },
    password:{
        type:String,
        required:[true , "password is required"],

    },
    avatar:{
        type:String,
        required:[true , " make sure you select our vartar pic or not"]
    },
    converImage:{
        type:String
    },
    
}, {timestamps:true})


userSchema.pre("save" , async function(next){
    if(!this.isModified('password')) return next()
        this.password= await bcrypt.hash(this.password , 10 )
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}


userSchema.methods=async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
    }, process.env.ACCESS_TOKEN_EXPIRYACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
) 
}


export const User = mongoose.model("UserTest" , userSchema)