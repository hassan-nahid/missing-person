import MissingPost from "../models/missingModel.js";
import User from "../models/userModel.js";

export const createMissingPost = async (req, res) => {
  try {
    const newPost = await MissingPost.create(req.body);
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

export const getAllMissingPosts = async (req, res) => {
  try {
    const posts = await MissingPost.find();
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



export const getMissingPostById = async (req, res) => {
  try {
    const post = await MissingPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Missing post not found",
      });
    }

    const user = await User.findOne({ email: post.email }).select("-identificationType -identificationNumber -documentPhoto"); 
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        post,
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateMissingPost = async (req, res) => {
  try {
    const updatedPost = await MissingPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Missing post not found",
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

export const deleteMissingPost = async (req, res) => {
  try {
    const deletedPost = await MissingPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Missing post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Missing post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
