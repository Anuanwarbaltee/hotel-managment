import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // Required for GeoJSON
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
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
      name: {
        type: String,
        required: true
      }
    }
  ],  
  averageRating: { 
    type: Number,
    default: 0 
  },
  reviewCount:{ 
   type: Number,
   default: 0 
  }
},
{
  timestamps: true
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
