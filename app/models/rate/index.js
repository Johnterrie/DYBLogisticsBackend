import mongoose from "mongoose";

// Define the Rate schema
const rateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Domestics", "Express"],
    },
    price: {
      type: Number,
      required: true,
    },
    duration: String,
   },
  { timestamps: true }
);

const Rate = mongoose.model("Rate", rateSchema);
export default Rate;
