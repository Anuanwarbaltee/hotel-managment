import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
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
  rating: {
    type: Number,
    required: true,
    default: 0 
  },
  comment: {
    type: String,
    required: true
  },
},
{
  timestamps: true
}
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
