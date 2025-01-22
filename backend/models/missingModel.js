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
    foundStatus: {
      type: Boolean,
      default: false, // Default is false (missing)
    },
    caseStatus: {
      type: String,
      enum: ["Alive", "Dead"], // Removed "Unknown"
      required: function () {
        return this.foundStatus === true; // Only required if the person is found
      },
    },
    caseType: {
      type: String,
      enum: ["Kidnapping", "Accident", "Runaway", "Other"], // Different case types
      required: false, // Optional field, can be updated later
    },
    otherCaseType: {
      type: String,
      required: function () {
        return this.caseType === "Other"; // Only required if caseType is "Other"
      },
      trim: true,
    },
    additionalInfo: {
      type: String,
      required: false, // Optional field for extra details
      trim: true,
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
