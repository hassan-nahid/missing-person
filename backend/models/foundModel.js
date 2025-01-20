import mongoose from 'mongoose';

const foundPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    foundAt: { type: String, required: true },
    clothes: { type: String },
    skinColor: { type: String },
    height: { type: String },
    photo: { type: String },
    description: { type: String },
    email: { type: String, required: true },
    foundStatus: { type: Boolean, default: false },
    caseStatus: {
      type: String,
      enum: ['Alive', 'Dead', 'Other'],
      default: 'Alive',
    },
    additionalDetails: { type: String },
    handoverDetails: {
      relativeName: { type: String }, // Name of the relative who received the person
      relationship: { type: String }, // Relationship with the found person (e.g., "Father", "Mother", etc.)
      contactInfo: { type: String }, // Contact information of the relative
      handoverDate: { type: Date }, // Date of handover
      remarks: { type: String }, // Additional remarks about the handover
    },
  },
  { timestamps: true }
);

const FoundPost = mongoose.model('FoundPerson', foundPersonSchema);
export default FoundPost;
