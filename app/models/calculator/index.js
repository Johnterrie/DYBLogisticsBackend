import mongoose from "mongoose";

// Define the Rate schema
const calculatorSchema = new mongoose.Schema(
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

const Calculator = mongoose.model("RateCalculator", calculatorSchema);
export default Calculator;
