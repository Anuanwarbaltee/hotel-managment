import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, 
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  amenities: [
    {
      type: String,
    }
  ],
  rating: {
    type: Number,
    default: 0 
  }
},
{
  timestamps: true
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
