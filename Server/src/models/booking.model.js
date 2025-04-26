import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  user: {  
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  hotel: {  
    type: Schema.Types.ObjectId,
    ref: "Hotel", 
    required: true
  },
  room: {  
    type: Schema.Types.ObjectId,
    ref: "Room", 
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    default: 1 
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"], 
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"], 
    required: true
  },
},
{
  timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
