import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0], 
    },
    mapLink: { 
      type: String, 
      required: true 
    },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String,  },
    zipCode: { type: String,  }
  },
  description: { type: String, required: true },
  images: [{ type: String }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  amenities: [{
    name: { type: String, required: true }
  }],

  isActive: {
    type: Boolean,
    default: false 
  },

  adminNote: {
    type: String 
  },

  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

hotelSchema.index({ "location": "2dsphere" });

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;