import mongoose from 'mongoose'

// Define the schema
const userSchema = new mongoose.Schema(
  {
   first_name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "First name should be more than three Characters"]
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "last name should be more than three Characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "First name should be more than four Characters"]
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
export default User
