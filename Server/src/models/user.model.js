import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "rider", "restaurant"],
      default: "user"
    },

    resetOTP: {
      type: String,
    },

    isOTPVerified: {
      type: Boolean,
      default: false,
    },

    OTPexpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User",userSchema);
export default User;