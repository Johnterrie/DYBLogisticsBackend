import mongoose from "mongoose";

// Define the Rate schema
const rateSchema = new mongoose.Schema(
  {
    domesticDuration: {
      type: String,
      required: true,
    },
    domesticPrice: {
      type: Number,
      required: true,
    },
    expressDuration: {
      type: String,
      required: true,
    },
    expressPrice: {
      type: Number,
      required: true,
    },
    
    duration: String,
   },
  { timestamps: true }
);

const Rate = mongoose.model("Rate", rateSchema);
export default Rate;
