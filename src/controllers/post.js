const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose"); // Import mongoose to use ObjectId validation
const postModel = require("../models/post");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const postControllers = {
  // Existing method for posting
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
        category
      });

      res.json(post);
    } catch (err) {
      console.error(err); // Log the error to the console
      res
        .status(500)
        .json({ message: "An error occurred while creating the post." });
    }
  },

  // New method for fetching a post by ID
  getPostById: async (req, res) => {
    try {
      const { postId } = req.params;

      // Validate postId before querying the database
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format." });
      }

      const post = await postModel.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      res.json(post);
    } catch (err) {
      console.error(err); // Log the error to the console
      res
        .status(500)
        .json({ message: "An error occurred while fetching the post." });
    }
  },
};

module.exports = { postControllers, upload };
