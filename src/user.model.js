import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true ,"username is required"],
            unique:true,
            lowercase:true,
            trim:true
        },

        email:{
            type:String,
            required:[true , "email is required"],
            trim:true,
            lowercase:true,
            unique:true
        },

        password:{
            type:String,
            required:[true , "password is required"],
            trim:true
        },



    },
    {
        timestamps:true
    }
)


export const User = mongoose.model("User", userSchema)