import { response } from "express";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";




export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body

    if ([name, email, password, username].some((field) => field.trim() == "")) {
        throw new ApiError(400, "all field are required")
    }

    const userExists = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userExists) {
        throw new ApiError(400, "user all ready exist from this username and email")
    }

    const user = await User.create({
        name,
        username: username.toLowerCase(),
        email,
        password
    })


    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(401, "user does not exist")
    }


    return res.status(200).json(
        new ApiResponse(200, createdUser, 'user register successfully')
    )

})






export const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

    if ([email, username, password].some(feild => feild.trim() == "")) {
        throw new ApiError(400, "all field are required")
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(201, "user does not exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    console.log(isPasswordCorrect)

    if (!isPasswordCorrect) {
        throw new ApiError(201, "check your email id and password")
    }

    const accessToken = await user.generateToken()


    const loggedInUser = await User.findOne({
        $or: [{ email }, { username }]
    }).select("-password")



    const options = {
        httpOnly: true,
        secure: true
    }


    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                cookie: accessToken
            },
                "user logged in successfully"
            )
        )

})




export const getCurrentUser = asyncHandler(async(req ,res)=>{

    return res.status(201).json(
         new ApiResponse(201 , req.user , 'this is current user details')
     )
 
 })






 export const logOutUser = asyncHandler(async(req , res)=>{


  

        const options ={
            httpOnly:true,
            secure:true
        }

        return res.status(200)
        .clearCookie("accessToken" , options)
        .json(
            new ApiResponse(200, {} , "user logged out")
        )

 })



 export const changePassword =(asyncHandler(async(req , res)=>{

    const {newPassword  , oldPassword} = req.body

    if([newPassword , oldPassword].some(ele=>ele.trim() == "") ){
        throw new ApiError(401 , "all field are required")
    }

    const user = await User.findById(req.user._id)

    const ispasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!ispasswordCorrect){
        throw new ApiError(400 , "Invalid old password")
    }

    user.password = newPassword

    await user.save({validateBeforeSave:false})
 

    return res.status(200)
    .json(new ApiResponse(200, {} , "password change Successfully"))

 }))




