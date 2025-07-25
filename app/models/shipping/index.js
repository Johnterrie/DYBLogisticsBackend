import mongoose from 'mongoose'

const shippingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trackingNumber: {
      type: String,
      required: true,
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
