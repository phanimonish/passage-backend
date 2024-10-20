const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const postModel = require("../models/post");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
  },
});

// Configure multer with the storage settings
const upload = multer({ storage });

// Post controllers
const postControllers = {
  post: async (req, res) => {
    try {
      const date = new Date().toLocaleDateString();
      const comments = Math.floor(Math.random() * 101);
      const claps = Math.floor(Math.random() * 401);
      const { username, title, description, category } = req.body;
      const imageUrl = req.file ? `uploads/${req.file.filename}` : null;

      const post = await postModel.create({
        username,
        title,
        description,
        imageUrl,
        date,
        comments,
        claps,
        category,
      });

      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while creating the post." });
    }
  },

  getPostById: async (req, res) => {
    try {
      const { postId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format." });
      }

      const post = await postModel.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      res.json(post);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the post." });
    }
  },

  deletePost: async (req, res) => {
    const { postId } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format." });
      }

      const deletedPost = await postModel.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found." });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (err) {
      console.error("Error deleting post:", err);
      res
        .status(500)
        .json({ message: "An error occurred while deleting the post." });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, description, category } = req.body;
      const existingPost = await postModel.findById(postId);

      if (!existingPost) {
        return res.status(404).json({ message: "Post not found." });
      }

      // Determine the image URL based on whether a new file was uploaded
      const imageUrl = req.file
        ? `uploads/${req.file.filename}`
        : existingPost.imageUrl;

      const updatedPost = await postModel.findByIdAndUpdate(
        postId,
        {
          title,
          description,
          imageUrl,
          category,
        },
        { new: true }
      );

      res.json(updatedPost);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while updating the post." });
    }
  },
};

// Export the upload middleware and controllers
module.exports = { postControllers, upload };
