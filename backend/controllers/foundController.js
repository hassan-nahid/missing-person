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

    if (!posts || posts.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No found posts for the provided email",
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


export const deleteFoundPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await FoundPost.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateFoundPersonStatus = async (req, res) => {
  try {
    const { id } = req.params; // ID from route params
    const { foundStatus, foundAliveStatus, additionalInfo, handoverDetails } = req.body;

    // Find the post by ID
    const foundPerson = await FoundPost.findById(id);

    if (!foundPerson) {
      return res.status(404).json({
        success: false,
        message: "Found person post not found.",
      });
    }

    if (foundPerson.foundStatus === true) {
      return res.status(400).json({
        success: false,
        message: "Status update not allowed. This post has already been marked as found.",
      });
    }

    // Update fields
    if (typeof foundStatus !== "undefined") {
      foundPerson.foundStatus = foundStatus;
    }
    if (typeof foundAliveStatus !== "undefined") {
      foundPerson.caseStatus = foundAliveStatus;
    }
    if (additionalInfo) {
      foundPerson.additionalDetails = additionalInfo;
    }
    if (handoverDetails && foundAliveStatus === "Alive") {
      foundPerson.handoverDetails = {
        ...foundPerson.handoverDetails,
        ...handoverDetails,
      };
    }

    // Save the updated document
    const updatedPerson = await foundPerson.save();

    res.status(200).json({
      success: true,
      message: "Found person status updated successfully.",
      data: updatedPerson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the found person status.",
      error: error.message,
    });
  }
};

