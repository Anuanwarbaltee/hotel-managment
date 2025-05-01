import  {User}  from "../models/user.model.js";
import  {ApiError}  from "../utils/ApiErrors.js";
import  {ApiResponse}  from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import { UploadonCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens  = async (userId) => {
    try {
        const user = await User.findById(userId);
         const  accessToken = user.generateAccessToken();
         const refreshToken  =  user.generateRefreshToken();
         user.refreshToken = refreshToken;
         await user.save({validateBeforeSave:false})
         return {accessToken, refreshToken} 
        } catch (error) {
           throw new ApiError(500, "Some thing went wrong while generating refresh and access tokens.") 
        }
}

const registerUser = asyncHandler(async (req,res)=>{
    const {fullName, username, phone, email, password, role} = req.body;
   if([username,phone,email,password,role].some(field => field?.trim() === "")){
    throw new ApiError(400,"All fields are required.")
   }  

   const exists = await User.findOne({
    $or:[{username},{email}]
   })

   if(exists){
    throw new ApiError(409,"User with name or email already exists.")
   }

   const avatarLocalPath  = req?.files?.avatar?.[0].path;

   let avatarUrl = ""; 

   if (avatarLocalPath) {
     const avatarUploadResult = await UploadonCloudinary(avatarLocalPath);
     avatarUrl = avatarUploadResult?.url || "";
   }

   const user = await User.create(
    {
    fullName,
    username: username?.toLowerCase(),
    email,
    avatar: avatarUrl,
    password,
    role,
    phone,
   }
 )

   const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user.")
   }

   return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully."))

})

const loginUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;
    if(!username && !email){
        throw new ApiError(400, "UserName or Email is required.")
    }

    if(!password){
        throw new ApiError(400, "Password is required.")
    }

    const user = await User.findOne({
        $or:[{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User doesn't exist.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400, "Invalid user credentials.")
    }

    const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(user?._id)

    const loginUser = await User.findById(user?._id).select("-password -refreshToken");

    const option ={
        httpOnly:true,
        secure:true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, loginUser, "User login successfully."))
})

const logoutUser = asyncHandler(async (req, res) => {
    const userId =  req.user?._id || req.body.userId;

    if (!userId) {
        throw new ApiError(401, "Unauthorized - no user found in request.");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $unset: { refreshToken: 1 },
        },
        { new: true }
    );

    if (!user) {
        throw new ApiError(500, "Something went wrong while logging out the user.");
    }

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out successfully.")
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export {registerUser, loginUser ,logoutUser , refreshAccessToken };