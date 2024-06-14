import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body

    if ([fullName, email, username, password].some((field) => field?.trim() == "")) {
        throw new ApiError(400, "all filed are required")
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









export {
    registerUser
}