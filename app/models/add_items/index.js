import mongoose from "mongoose";

// Define the Rate schema
const addItemsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: String,
      required: true,
    },
    proof_of_weight: {
      type: String,
      required: true,
    },
    uploadedAt: { type: Date, default: Date.now },
    filename: { type: String, required: true },      // actual file name
    },
  { timestamps: true }
);

const AddItems = mongoose.model("RateCalculator", addItemsSchema);
export default AddItems;
