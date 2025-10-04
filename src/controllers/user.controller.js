import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

    //get user details from frontend
    // check for user validation
    //check if user already exist : username & email 
    //check for images , check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db 
    //remove password and refresh token field from response 
    //check for user creation 
    //return response



    //get user details from frontend
    const registerUser = asyncHandler(async(req, res)=>{

        const{fullName, username, email, password} = req.body


        // check for user validation
    if(
        [fullName, username , email, password].some((fields)=>
            (fields?.trim() ===""))
    ){
        throw new ApiError(400,"All the fir=elds are required !!!");
    }


    //check if user already exist : username & email 
    const existedUser = await User.findOne({
        $or:[{username, email}]
    })
    if(existedUser){
        throw new ApiError(409,"User already Exist with this email or username!!!")
    }

    //check for images , check for avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    //Since this line will give us error of undefined if user does not provide coverImage
    //const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0){
        coverImageLocalPath = req.files.coverImage[0].path
    }
    if(!avatarLocalPath){
        throw new ApiError(400,"avatar files are missing!!")
    }

    //upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar file is not uploaded clearly in cloudinary!!")
    }

    //create user object - create entry in db 
    const user = await User.create({
        username : username.toLowerCase(),
        fullName,
        email,
        password,
        avatar : avatar.secure_url || avatar.url,
        coverImage : coverImage?.url || ""
    });

    //remove password and refresh token field from response 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    //check for user creation 
    if(!createdUser){
        throw new ApiError(400,"Something went wrong while finding the user")
    }
    
    //return the response
    res.status(201).json(
        new ApiResponse(201,"User created successfully!!", createdUser)
    )
})

export {
    registerUser,
}