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

export const getMissingPostsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const posts = await MissingPost.find({ email });

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

export const deleteMissingPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the post by ID and delete it
    const deletedPost = await MissingPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Missing post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Missing post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateFoundStatus = async (req, res) => {
  try {
    const { id } = req.params; // Post ID from the route parameter
    const { foundStatus, caseStatus, caseType, otherCaseType } = req.body; // Data from the request body

    // Validate foundStatus
    if (typeof foundStatus !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid foundStatus. It must be a boolean.",
      });
    }

    // Find the post by ID
    const existingPost = await MissingPost.findById(id);

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Missing post not found.",
      });
    }

    // Prevent updates if foundStatus is already true
    if (existingPost.foundStatus === true) {
      return res.status(400).json({
        success: false,
        message: "Status update not allowed. This post has already been marked as found.",
      });
    }

    // Validate caseStatus only if foundStatus is true
    if (foundStatus === true && !["Alive", "Dead"].includes(caseStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid caseStatus. It must be 'Alive' or 'Dead' when foundStatus is true.",
      });
    }

    // Validate caseType
    if (caseType && !["Kidnapping", "Accident", "Runaway", "Other"].includes(caseType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid caseType. It must be one of 'Kidnapping', 'Accident', 'Runaway', or 'Other'.",
      });
    }

    // Validate otherCaseType if caseType is "Other"
    if (caseType === "Other" && (!otherCaseType || otherCaseType.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "otherCaseType is required when caseType is 'Other'.",
      });
    }

    // Update the missing post
    const updateData = {
      foundStatus,
      caseStatus: foundStatus ? caseStatus : undefined, // Clear caseStatus if foundStatus is false
      caseType,
      otherCaseType: caseType === "Other" ? otherCaseType : undefined, // Clear otherCaseType if caseType is not "Other"
    };

    const updatedPost = await MissingPost.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // Success response
    res.status(200).json({
      success: true,
      message: "Found status and case type updated successfully.",
      data: updatedPost,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the found status and case type.",
      error: error.message,
    });
  }
};






