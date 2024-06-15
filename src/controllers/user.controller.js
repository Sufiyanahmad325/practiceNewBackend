import { validate } from "email-validator";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body

    if ([fullName, email, username, password].some((field) => field?.trim() == "")) {
        throw new ApiError(400, "all filed are required")
    }

    const isEmailValid = validate(email);
    if (!isEmailValid) {
        throw new ApiError(401, "plaese check your email")
    }





    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(402, "user with email or username already exists")
    }

    const avatarLocalPath = await req.files?.avatar[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(401, "Avatar is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("==>>>>>>>>>>>>>>>>>>>", avatar);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }



    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })


    const createUser = await User.findById(user._id).select(
        "-password"
    )


    return res.status(201).json(
        new ApiResponse(200, createUser, "User register successfully")
    )



})

// ---------------------------------------------------------------------------



const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

    if (!(email || username)) {
        throw new ApiError("401", "all fields are required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(!user){
        throw new ApiError(401, "user does not exist")
    }
    
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    
    if(!isPasswordValid){
        throw new ApiError(400 , "invalid email and password")
    }


    const accessToken = await user.generateAccessToken()

    const loggedInUser = await User.findById(user._id).select(
        "-password"
    )


        const option={
            httpOnly:true,
            secure:true
        }

        return res.status(200)
        .cookie("accessToken" , accessToken , option)
        .json(
            new ApiResponse(200 , {user:loggedInUser , accessToken} , 'user logged in successfully')
        )


})






export {
    registerUser,
    loginUser
}