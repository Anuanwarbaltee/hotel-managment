import Booking from "../models/booking.model.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import { UploadonCloudinary } from "../utils/cloudinary.js";


const getHotel = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (id != 1) {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      throw new ApiError(404, "Hotel not found");
    }
    return res.status(200).json(
      new ApiResponse(200, hotel, "Hotel retrieved successfully")
    );
  } else {
    const hotels = await Hotel.find({});
    return res.status(200).json(
      new ApiResponse(200, hotels, "All hotels retrieved successfully")
    );
  }
});

const getHotelById = asyncHandler(async (req, res) => {
  const id = req.user?._id || 1;

    const hotel = await Hotel.find({owner: id}).sort({ createdAt: -1 });
    if (!hotel) {
      throw new ApiError(404, "Hotel not found");
    }
    return res.status(200).json(
      new ApiResponse(200, hotel, "Hotel retrieved successfully")
    );
  
});


const getAllHotels = asyncHandler(async (req, res) => {
  const { location, checkIn, checkOut ,} = req.query;

  //  Pagination params
  const page = Number(req.query.page) || 1;
  const limit =  10;
  const skip = (page - 1) * limit;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

   // Location filter
  let query = {};

  if (location) {
    const regex = new RegExp(location, "i");
    query = {
      $or: [
        { "location.city": regex },
        { "location.state": regex },
        { "location.country": regex },
      ],
    };
  }

  // If dates are invalid → simple pagination
  if (isNaN(checkInDate) || isNaN(checkOutDate)) {
    const hotels = await Hotel.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Hotel.countDocuments();

    return res.status(200).json(
      new ApiResponse(200, {
        hotels,
        pagination: {
         currentPage: page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      }, "All hotels retrieved successfully")
    );
  }

  //  Find overlapping bookings
  const bookings = await Booking.find({
    checkInDate: { $lt: checkOutDate },
    checkOutDate: { $gt: checkInDate },
    status: { $ne: "cancelled" },
  }).populate("room hotel");

  // Map booked rooms by hotel
  const bookedRoomMap = {};

  bookings.forEach((booking) => {
    const hotelId = booking.hotel?._id?.toString();
    const roomId = booking.room?._id?.toString();

    if (!hotelId || !roomId) return;

    if (!bookedRoomMap[hotelId]) {
      bookedRoomMap[hotelId] = new Set();
    }

    bookedRoomMap[hotelId].add(roomId);
  });

 

  // Fetch hotels (pagination applied)
  const allHotels = await Hotel.find(query)
    .skip(skip)
    .limit(limit);

    const total = await Hotel.countDocuments();

  // Filter hotels with available rooms
  const hotelPromises = allHotels.map(async (hotel) => {
    const hotelId = hotel._id.toString();

    const rooms = await Room.find({ hotel: hotelId });
    const bookedRooms = bookedRoomMap[hotelId] || new Set();

    const availableRooms = rooms.filter(
      (room) => !bookedRooms.has(room._id.toString())
    );

    return availableRooms.length > 0 ? hotel : null;
  });

  const hotelResults = await Promise.all(hotelPromises);
  const availableHotels = hotelResults.filter(Boolean);

  res.status(200).json(
    new ApiResponse(200, {
      hotels: availableHotels,
      pagination: {
        currentPage: page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }, "Hotels fetched successfully.")
  );
});




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
  const { name, description,  amenities,  mapLink,  images, country, city, state, zipCode } = req.body;
  console.log({ name, description, mapLink,  images, country, city })
  if (!name || !description || !country || !city || !mapLink) {
    throw new ApiError(400, "All fields are required..");
  }

  const hotel = await Hotel.create({
    name,
    images,
    description,
    location: {
      type: "Point",
      country,
      city,
    mapLink,
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

export { addHotel, updateHotel, uploadFiles, deleteHotel, getHotel , getAllHotels , getHotelById }