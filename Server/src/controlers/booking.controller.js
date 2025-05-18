import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiErrors.js";


const createBooking = asyncHandler(async(req, res)=>{

    const {userId, roomId,hotelId, guests,checkInDate,checkOutDate} = req.body;

      if (![guests, checkInDate, checkOutDate].every(item => item)) {
    throw new ApiError(400, "All fields are required.");
  }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Valid user ID is required");
    }

    if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
        throw new ApiError(400, "Valid hotel ID is required");
    }

    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
        throw new ApiError(400, "Valid room ID is required");
    }

    const isRoomAvaible = await Booking.find(
        {
         room : roomId,
         checkInDate:{$lt: checkOutDate},
         checkOutDate:{$gt:checkInDate}
        }
    )

    if(isRoomAvaible?.length > 0){
        throw new ApiError(409,"The room is already booked for the selected dates.")
    }

    const booking = await Booking.create({
        user: userId,
        room: roomId,
        hotel: hotelId,
        checkInDate,
        checkOutDate,
        guests,
    })

    return res.status(201).json(new ApiResponse(201, booking , "Booking created successfully"))
})

const updateBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  const {
    checkInDate,
    checkOutDate,
    guests,
    status,
    paymentStatus
  } = req.body;

  // Validate booking ID
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new ApiError(400, "Invalid booking ID");
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  //Check for date conflicts 
  if (checkInDate && checkOutDate) {
    const conflictingBookings = await Booking.find({
      _id: { $ne: bookingId },
      room: booking.room,
      $or: [
        {
          checkInDate: { $lt: new Date(checkOutDate) },
          checkOutDate: { $gt: new Date(checkInDate) }
        }
      ]
    });

    if (conflictingBookings.length > 0) {
      throw new ApiError(409, "Room is already booked for selected dates");
    }
  }

  if (checkInDate) booking.checkInDate = checkInDate;
  if (checkOutDate) booking.checkOutDate = checkOutDate;
  if (guests !== undefined) booking.guests = guests;
  if (status) booking.status = status;
  if (paymentStatus) booking.paymentStatus = paymentStatus;

  await booking.save();

  return res.status(200).json(
    new ApiResponse(200, booking, "Booking updated successfully")
  );
});


const getHotelBookings = asyncHandler(async (req, res) => {
  const hotelId = req.params.hotelId;
  const {
    status,
    paymentStatus,
    startDate,
    endDate,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = req.query;

  if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
    throw new ApiError(400, "Valid hotel ID is required");
  }

  const filter = {
    hotel: hotelId,
  };

  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  if (startDate || endDate) {
    filter.checkInDate = {};
    if (startDate) filter.checkInDate.$gte = new Date(startDate);
    if (endDate) filter.checkInDate.$lte = new Date(endDate);
  }

  const sortOptions = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const bookings = await Booking.find(filter)
    .populate("user", "fullName email")
    .populate("room", "title capacity price")
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Booking.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      bookings,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    }, "Hotel bookings fetched successfully")
  );
});


const getAllBookings = asyncHandler(async (req, res) => {
  const {
    status,
    paymentStatus,
    userId,
    hotelId,
    roomId,
    startDate,
    endDate,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = 1,
    limit = 10
  } = req.query;

  const filter = {};

  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;
  if (userId && mongoose.Types.ObjectId.isValid(userId)) filter.user = userId;
  if (hotelId && mongoose.Types.ObjectId.isValid(hotelId)) filter.hotel = hotelId;
  if (roomId && mongoose.Types.ObjectId.isValid(roomId)) filter.room = roomId;

  if (startDate || endDate) {
    filter.checkInDate = {};
    if (startDate) filter.checkInDate.$gte = new Date(startDate);
    if (endDate) filter.checkInDate.$lte = new Date(endDate);
  }

  const sortOptions = {
    [sortBy]: sortOrder === "asc" ? 1 : -1
  };

  const bookings = await Booking.find(filter)
    .populate("user", "fullName email avatar")
    .populate("hotel", "name location")
    .populate("room", "title capacity roomType")
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Booking.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      bookings,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    }, "Filtered bookings fetched successfully")
  );
});


 const deleteBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Valid ID is required");
    }
    
    const booking = await Booking.findByIdAndDelete(id);
  
  
    if (!booking) {
      throw new ApiError(404, "Room not Found");
    }
    return res.status(200)
      .json(
        new ApiResponse(200, null, "Room deleted successfully.")
      )
  })


export {createBooking , getHotelBookings , getAllBookings , updateBooking , deleteBooking};