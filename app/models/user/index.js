import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name should be more than three characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "Password should be more than four characters"],
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Phone number should be more than three characters"],
    },
    userType: {
      type: String,
      required: true,
      enum: ["individual", "business"],
    },
    wallet: {
      type: Number,
      default: 0.00,
    },
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shipping",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
