import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    trackingNumber: {
      type: String,
      unique: true,
    },

    // =====================
    // Sender Information
    // =====================
    senderFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    senderLastName: {
      type: String,
      required: true,
      trim: true,
    },
    senderAddressLine1: {
      type: String,
      required: true,
    },
    senderAddressLine2: {
      type: String,
    },
    senderCountry: {
      type: String,
      required: true,
    },
    senderStateProvince: {
      type: String,
      required: true,
    },
    senderCity: {
      type: String,
      required: true,
    },
    senderPhoneNumber: {
      type: String,
      required: true,
    },
    senderAlternatePhone: {
      type: String,
    },

    // =====================
    // Receiver Information
    // =====================
    receiverFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    receiverLastName: {
      type: String,
      required: true,
      trim: true,
    },
    receiverAddressLine1: {
      type: String,
      required: true,
    },
    receiverAddressLine2: {
      type: String,
    },
    receiverCountry: {
      type: String,
      required: true,
    },
    receiverStateProvince: {
      type: String,
      required: true,
    },
    receiverCity: {
      type: String,
      required: true,
    },
    receiverPhoneNumber: {
      type: String,
      required: true,
    },
    receiverAlternatePhone: {
      type: String,
    },

    // =====================
    // Shipping Details
    // =====================
    destination: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Destination should be more than three characters"],
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: ["Domestic", "Express"],
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
    },
    estimatedDelivery: {
      type: String,
    },
    itemsDescription: {
      type: String,
    },

    // =====================
    // Proof of Weight (Cloudinary upload)
    // =====================
    proofOfWeight: {
      url: { type: String }, // Cloudinary URL
      public_id: { type: String }, // Cloudinary file ID
    },
  },
  { timestamps: true }
);

// Auto-generate tracking number before saving
shippingSchema.pre("save", function (next) {
  if (!this.trackingNumber) {
    this.trackingNumber = `DYB-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
  }
  next();
});

const Shipping = mongoose.model("Shipping", shippingSchema);

export default Shipping;
