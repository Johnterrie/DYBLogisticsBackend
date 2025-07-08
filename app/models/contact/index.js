import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "First name should be more than three characters"],
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Last name should be more than three characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    phone_number: {
      type: Number,
      required: [true, "Phone number is required."],
    },

    reason_for_enquiry: {
      type: String,
      required: [true, "Reason for enquiry is required."],
    },

    message: {
      type: String,
      required: [true, "message for enquiry is required."],
    },
  },
  {
    timestamps: true,
  }
);

// Create models
const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
