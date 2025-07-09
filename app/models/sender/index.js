import mongoose from "mongoose";

// Define the Rate schema
const calculatorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    lastt_name: {
      type: String,
      required: true,
    },
    address_line_1: {
      type: String,
      required: true,
    },
    address_line_2: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
 
    postal_code: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: Number,
      required: true,
    },

    alternate_phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Calculator = mongoose.model("RateCalculator", calculatorSchema);
export default Calculator;
