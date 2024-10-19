import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, 'email is most required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    }

}, { timestamps: true })


// UserSchema.pre('save' , async function(next){
//     if(!this.isModified('password')) return next()
//          this.password = await bcrypt.hash(this.password , 10)
//     next()
// })


// UserSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password , this.password)
// }


// UserSchema.methods.generateAccessToken = async function(){
// return jwt.sign({

//     _id : this._id,
//     username:this.username,
//     email:this.email,
//     name:this.name
// } , 
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//     }

// )
// }


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
})



UserSchema.methods.generateToken = async function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        name: this.name
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User", UserSchema)