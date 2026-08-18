import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, fullName, password } = req.body;
    //console.log(req.body);

    if ([fullName, email, username, password].some((feild) =>
        feild?.trim() === "")) {
        throw new ApiError(400, "All Feilds are Required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    console.log(existedUser)

    if (existedUser) {
        throw new ApiError(409, "username or email aready exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverimageLocalPath = req.files?.coverimage[0].path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is Required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverimage = await uploadOnCloudinary(coverimageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName, email, 
        avatar : avatar.url, 
        coverimage : coverimage?.url || "",
        username : username.toLowercase(),
        password
    })
     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     );

     if(!createdUser){
        throw new ApiError(500 , "something went wrong while registering user")
     }

     return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
     )

    

})
// steps for register user 
// 1. get user details - (username, email, password, )
// 2. validation - not empty
// 3. check if user already exist : email and username
// 4. check for images and check for avatar
// 5. upload images to cludinary
// 6. create user object and create entry in DB
// 7. remove password and refreshToken from response 
// 8. check for user creation
// 9. return res

export { registerUser } 