import Message from "../models/messageModal.js";
import MissingPost from "../models/missingModel.js";


export const createMessage = async (req, res) => {
  try {
    const { from, to, name, phone, details, postId } = req.body;

    // Validate required fields
    if (!from || !to || !name || !phone || !details || !postId) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    // Create and save message
    const message = new Message({ from, to, name, phone, details, postId });
    await message.save();

    res.status(201).json({ success: true, message: 'Message saved successfully!', data: message });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};



export const getMessagesByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Extract email from query params

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email query parameter is required.' });
    }

    // Find messages where the email is either sender or receiver
    const messages = await Message.find({
      $or: [{ from: email }, { to: email }],
    }).sort({ createdAt: -1 });

    // Enrich messages with missing person's name based on postId
    const enrichedMessages = await Promise.all(
      messages.map(async (message) => {
        const post = await MissingPost.findById(message.postId);
        return {
          ...message.toObject(),
          missingPersonName: post ? post.name : null, // Assuming the Post model has a `missingPersonName` field
        };
      })
    );

    res.status(200).json({ success: true, data: enrichedMessages });
  } catch (error) {
    console.error('Error retrieving messages by email:', error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};
