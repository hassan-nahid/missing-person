import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Reference another collection (if applicable)
      required: true,
    },
    postType: {
      type: String,
      enum: ['missing', 'found'],
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Message = mongoose.model('Message', messageSchema);

export default Message;