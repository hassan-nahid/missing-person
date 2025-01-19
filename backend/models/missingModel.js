import mongoose from "mongoose";

const missingPostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    careOf: {
      type: String,
      required: [true, "Care Of (e.g., Parent/Guardian Name) is required"],
      trim: true,
    },
    lastSeen: {
      type: String,
      required: [true, "Last Seen Location is required"],
    },
    clothes: {
      type: String,
      required: [true, "Clothes description is required"],
    },
    skinColor: {
      type: String,
      required: [true, "Skin Color is required"],
    },
    height: {
      type: String,
      required: [true, "Height is required"],
    },
    education: {
      type: String,
      required: false,
      trim: true,
    },
    seriousIllnessOrDisabled: {
      type: String,
      required: false,
      trim: true,
    },
    photo: {
      type: String, // Store the URL/path of the uploaded photo
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const MissingPost = mongoose.model("MissingPost", missingPostSchema);

export default MissingPost;
