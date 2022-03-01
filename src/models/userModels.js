const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    emailID: {
      // valid
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    mobileNumber: {
      // valid
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    DateOfBarth: {
      type: Date,
      required: true,
      trim: true,
    },

    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: Number,
        required: true,
        trim: true,
      },
    },
    customerID:{
        type:String,
        required:true,
        trim:true
    },
    status:{
      type: String,
        trim: true,
        default: "ACTIVE" 
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
