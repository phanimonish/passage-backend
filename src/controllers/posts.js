const postModel = require("../models/post");

const postsControllers = {
  // Controller to get posts (optionally by category)
  get: async (req, res) => {
    const { category } = req.query;

    try {
      let posts;
      if (category) {
        posts = await postModel.find({ category }).sort({ _id: -1 });
      } else {
        posts = await postModel.find({}).sort({ _id: -1 });
      }
      res.json(posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the posts." });
    }
  },

  // Controller to get posts by username
  getPostsByUsername: async (req, res) => {
    const username = req.params.username;

    try {
      const posts = await postModel.find({ username }).sort({ _id: -1 });
      if (!posts.length) {
        return res.status(404).json({ error: "No posts found for this user" });
      }
      res.json(posts);
    } catch (err) {
      console.error("Error fetching posts by username:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the posts." });
    }
  },

  // Controller to delete a post by ID
  
};

module.exports = postsControllers;
