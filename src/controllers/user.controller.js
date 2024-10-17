import { response } from "express";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";




export const registerUser= asyncHandler(async(req ,res)=>{
    const {name , email , password , username } = req.body

    if([name , email , password , username].some((field)=>field.trim() === "")){
        throw new  ApiError(400 , 'all field are required')
    }

    const existedUser = await User.findOne({
        $or:[{username} , {email}]
    })


    if(existedUser){
            throw new ApiError(400 , "user all ready exist")
    }

    const user = await User.create({
        name,
        username,
        password,
        email
    });



    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(200 , "user not avalible")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser , "user register successfully")
    )

})