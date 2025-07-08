import mongoose from 'mongoose'

const shippingSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Destination should be more than three characters"]
    },
    rate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rate',
      required: true,
      enum: ["Domestic", "Express"]
    },
    allServices: {
      type: String,
      required: [true, "Service is required."],
      unique: true,
    },
  },
  {
    timestamps: true
  }
)

// Create models
const Shipping = mongoose.model('Shipping', shippingSchema)

export default Shipping 
