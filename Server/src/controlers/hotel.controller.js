import Hotel from "../models/hotel.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import { UploadonCloudinary } from "../utils/cloudinary.js";


const addHotel = asyncHandler(async(req,res)=>{
    const { name,  description, address, amenities, latitude, longitude , imgUrls} = req.body;
  console.log({ name,  description, address, amenities, latitude, longitude , imgUrls})
    if (!name  || !description || !address || !latitude || !longitude) {
        throw new ApiError(400, "All fields are required.");
    }

    const hotel = await Hotel.create({
        name,
        images:imgUrls,
        description,
        location:{
            type:"Point",
            coordinates:[parseFloat(longitude), parseFloat(latitude)],
            address,
        },
        amenities:amenities || [],
        owner:req?.user?._id,
    })

    return res.status(200)
    .json(
        new ApiResponse(200,hotel,"Hotel added successfully.")
    )
})


const uploadFiles = asyncHandler(async(req, res) => {

    const files = req.files.images;

    if (!files || files.length === 0) {
      throw new ApiError(400, "No files were uploaded.");
    }
    
    const uploadedFiles = await Promise.all(
      files.map(file => UploadonCloudinary(file.path))
    );
    
    const imageUrls = uploadedFiles.map(file => file.url);

    return res.status(200).json(
    new ApiResponse(200, imageUrls, "Images uploaded successfully."));
})

export {addHotel,uploadFiles}