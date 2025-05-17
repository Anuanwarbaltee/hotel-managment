import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  hotel: {  
    type: Schema.Types.ObjectId,
    ref: "Hotel", 
    required: true
  },
  roomType: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    default: 0 
  },
  capacity: {
    type: Number,
    required: true,
    default: 0 
  },
  images: [
    {
      type: String,
      required:true 
    }
  ],
  description: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true
  },
},
{
  timestamps: true
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
