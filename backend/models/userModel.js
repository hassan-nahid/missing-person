import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      default: null,
      trim: true,
    },
    phone: {
        type: String,
        default: null,
      },
    address: {
      division: { type: String, default: null, trim: true },
      district: { type: String, default: null, trim: true },
      upazila: { type: String, default: null, trim: true },
      street: { type: String, default: null, trim: true },
    },
    identificationType: {
      type: String,
      enum: ["nid", "passport", "birth_certificate"],
      default: null,
    },
    identificationNumber: {
      type: String,
      default: null,
      trim: true,
    },
    documentPhoto: {
      type: String,
      default: null,
    },
    userPhoto: {
      type: String,
      default: null,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to update updatedAt on save
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
