import mongoose from "mongoose";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";

const addRoom = asyncHandler(async (req, res) => {
    const { description, images, capacity, price, roomType, hotelId , availability } = req.body;
  
    if (!price || !capacity || !images || !hotelId) {
      throw new ApiError(400, "Price, capacity, images, and hotelId are required.");
    }
  
    const hotelExists = await Hotel.findById(hotelId);
    if (!hotelExists) {
      throw new ApiError(404, "Hotel not found.");
    }
  
    const room = await Room.create({
      hotel: hotelId, 
      description,
      images,
      capacity,
      price,
      roomType,
      availability:availability,
    });
  
    return res.status(201).json(
      new ApiResponse(201, room, "Room created successfully.")
    );
  });

  const getRoom = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid room ID");
    }
  
    const roomData = await Room.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "hotels",
          localField: "hotel",
          foreignField: "_id",
          as: "hotelDetails",
          pipeline: [
            {
              $project: {
                name: 1,
                location: 1,
                amenities: 1,
                owner: 1
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                  {
                    $project: {
                      fullName: 1,
                      userName: 1,
                      email: 1,
                      avatar: 1
                    }
                  }
                ]
              }
            },
            {
              $unwind: {
                path: "$ownerDetails",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $addFields: {
                owner: "$ownerDetails"
              }
            },
            {
              $project: {
                ownerDetails: 0
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: "$hotelDetails",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);
  
    if (!roomData || roomData.length === 0) {
      throw new ApiError(404, "Room not found");
    }
  
    return res.status(200).json(
      new ApiResponse(200, roomData[0], "Room retrieved successfully")
    );
  });

  const getAllRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.aggregate([
      {
        $lookup: {
          from: "hotels",
          localField: "hotel",
          foreignField: "_id",
          as: "hotelDetails",
          pipeline: [
            {
              $project: {
                name: 1,
                location: 1,
                amenities: 1,
                owner: 1
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                  {
                    $project: {
                      fullName: 1,
                      userName: 1,
                      email: 1,
                      avatar: 1
                    }
                  }
                ]
              }
            },
            {
              $unwind: {
                path: "$ownerDetails",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $addFields: {
                owner: "$ownerDetails"
              }
            },
            {
              $project: {
                ownerDetails: 0
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: "$hotelDetails",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);
  
    return res.status(200).json(
      new ApiResponse(200, rooms, "All rooms retrieved successfully")
    );
  });
  

  const updateRoom = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      throw new ApiError(400, "Room ID is required");
    }
  
    const updateData = {};
    const fields = ["hotel", "description", "images", "capacity", "price", "roomType", "availability"];
  
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });
  
    const updatedRoom = await Room.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  
    if (!updatedRoom) {
      throw new ApiError(404, "Room not found");
    }
  
    return res.status(200).json(
      new ApiResponse(200, updatedRoom, "Room updated successfully")
    );
  });
  
  
  const deleteRoom = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "ID is required.");
    }
    const room = await Room.findByIdAndDelete(id);
  
  
    if (!room) {
      throw new ApiError(404, "Room not Found");
    }
    return res.status(200)
      .json(
        new ApiResponse(200, null, "Room deleted successfully.")
      )
  })

export { addRoom ,updateRoom, getRoom , deleteRoom , getAllRooms}