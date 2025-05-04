import Hotel from "../models/hotel.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import { UploadonCloudinary } from "../utils/cloudinary.js";

const deleteHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "ID is required.");
  }
  const deletedHotel = await Hotel.findByIdAndDelete(id);


  if (!deletedHotel) {
    throw new ApiError(404, "hotel not Found");
  }
  return res.status(200)
    .json(
      new ApiResponse(200, null, "Hotel deleted successfully.")
    )
})


const updateHotel = asyncHandler(async (req, res) => {
  const { name, description, address, amenities, latitude, longitude, imgUrls, country, city, state, zipCode } = req.body;
  console.log({ name, description, address, amenities, latitude, longitude, imgUrls, country, city, state, zipCode })
  if (!name || !description || !address || !latitude || !longitude) {
    throw new ApiError(400, "All fields are required.");
  }
  const { id } = req.params;
  const updatedItem = await Hotel.findByIdAndUpdate(id, {
    name,
    images: imgUrls,
    description,
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      country,
      city,
      state,
      zipCode
    },
    amenities: amenities || [],
    owner: req?.user?._id,
  }, { new: true });
  if (!updatedItem) {
    throw new ApiError(400, "Required item not found");
  }
  return res.status(200)
    .json(
      new ApiResponse(200, null, "Hotel updated successfully.")
    )
})

const addHotel = asyncHandler(async (req, res) => {
  const { name, description, address, amenities, latitude, longitude, imgUrls, country, city, state, zipCode } = req.body;
  console.log({ name, description, address, amenities, latitude, longitude, imgUrls, country, city, state, zipCode })
  if (!name || !description || !address || !latitude || !longitude) {
    throw new ApiError(400, "All fields are required.");
  }

  const hotel = await Hotel.create({
    name,
    images: imgUrls,
    description,
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      country,
      city,
      state,
      zipCode
    },
    amenities: amenities || [],
    owner: req?.user?._id,
  })

  return res.status(200)
    .json(
      new ApiResponse(200, hotel, "Hotel added successfully.")
    )
})
const uploadFiles = asyncHandler(async (req, res) => {

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

export { addHotel, updateHotel, uploadFiles, deleteHotel }