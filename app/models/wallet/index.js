import mongoose from "mongoose";

// Define the schema
const WalletSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name should be more than three characters"],
    },
    balance: {
      type: Number,
      required: [true, "Email is required."],
      unique: true,
      default: 0.00
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;
