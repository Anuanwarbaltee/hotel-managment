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
    const roomId = req.params.id;
    const { checkIn, checkOut, capacity ,price} = req.query;
  
    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
      throw new ApiError(400, "Valid Room ID is required");
    }
  
    const matchStage = {
      room: new mongoose.Types.ObjectId(roomId),
    };
  
    if (capacity) {
      matchStage.capacity = { $gte: parseInt(capacity) };
    }

    if(price){
      matchStage.price = { $gte: parseInt(price) };
    }
  
    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "room",
          as: "bookings",
        },
      },
      {
        $addFields: {
          isAvailable: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$bookings",
                        as: "booking",
                        cond: {
                          $and: [
                            checkIn ? { $lt: ["$$booking.checkIn", new Date(checkOut)] } : true,
                            checkOut ? { $gt: ["$$booking.checkOut", new Date(checkIn)] } : true,
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
              then: false,
              else: true,
            },
          },
        },
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
                owner: 1,
              },
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
                      avatar: 1,
                    },
                  },
                ],
              },
            },
            { $unwind: "$ownerDetails" },
            { $addFields: { owner: "$ownerDetails" } },
            { $project: { ownerDetails: 0 } },
          ],
        },
      },
      { $unwind: "$hotelDetails" },
    ];
  
    const rooms = await Room.aggregate(pipeline);
  
    return res
      .status(200)
      .json(new ApiResponse(200, rooms, "Room fetched Successfully."));
  });

  const getHotelRooms = asyncHandler(async (req, res) => {
    const hotelId = req.params.id;
    const { checkIn, checkOut, capacity , price} = req.query;
  
    if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
      throw new ApiError(400, "Valid hotel ID is required");
    }
  
    const matchStage = {
      hotel: new mongoose.Types.ObjectId(hotelId),
    };
  
    if (capacity) {
      matchStage.capacity = { $gte: parseInt(capacity) };
    }
  
    if(price){
      matchStage.price = { $gte: parseInt(price) };
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "room",
          as: "bookings",
        },
      },
      {
        $addFields: {
          isAvailable: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$bookings",
                        as: "booking",
                        cond: {
                          $and: [
                            checkIn ? { $lt: ["$$booking.checkIn", new Date(checkOut)] } : true,
                            checkOut ? { $gt: ["$$booking.checkOut", new Date(checkIn)] } : true,
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
              then: false,
              else: true,
            },
          },
        },
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
                owner: 1,
              },
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
                      avatar: 1,
                    },
                  },
                ],
              },
            },
            { $unwind: "$ownerDetails" },
            { $addFields: { owner: "$ownerDetails" } },
            { $project: { ownerDetails: 0 } },
          ],
        },
      },
      { $unwind: "$hotelDetails" },
    ];
  
    const rooms = await Room.aggregate(pipeline);
  
    return res
      .status(200)
      .json(new ApiResponse(200, rooms, "Hotel rooms fetched Successfully."));
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

export { addRoom ,updateRoom, getRoom , deleteRoom ,getHotelRooms, getAllRooms}