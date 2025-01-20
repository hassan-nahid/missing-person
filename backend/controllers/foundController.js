import FoundPost from "../models/foundModel.js";
import User from "../models/userModel.js";

export const createFoundPost = async (req, res) => {
  try {
    const newPost = await FoundPost.create(req.body);
    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllFoundPosts = async (req, res) => {
  try {
    const posts = await FoundPost.find();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFoundPostById = async (req, res) => {
  try {
    const post = await FoundPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Found person record not found",
      });
    }

    const user = await User.findOne({ email: post.email }).select(
      "-identificationType -identificationNumber -documentPhoto"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { post, user },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFoundPostsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const posts = await FoundPost.find({ email });

    if (!posts.length) {
      return res.status(404).json({
        success: false,
        message: "No records found for the provided email",
      });
    }

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateFoundPost = async (req, res) => {
  try {
    const updatedPost = await FoundPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Found person record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteFoundPost = async (req, res) => {
  try {
    const deletedPost = await FoundPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Found person record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Found person record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
