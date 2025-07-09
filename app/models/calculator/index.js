import mongoose from "mongoose";

// Define the Rate schema
const calculatorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to_country: {
      type: String,
      required: true,
    },
    to_state: {
      type: String,
      required: true,
    },
    to_city: {
      type: String,
      required: true,
    },
    from_country: {
      type: String,
      required: true,
    },
    from_state: {
      type: String,
      required: true,
    },
    from_city: {
      type: String,
      required: true,
    },

    currency: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    duration: String,
  },
  { timestamps: true }
);

const Calculator = mongoose.model("RateCalculator", calculatorSchema);
export default Calculator;
