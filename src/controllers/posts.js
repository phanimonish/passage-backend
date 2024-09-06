const postModel = require("../models/post");

const postsControllers = {
  get: async (req, res) => {
    const { category } = req.query;

    try {
      let posts;
      if (category) {
        posts = await postModel.find({ category }).sort({ _id: -1 }); // Sort by newest posts first
      } else {
        posts = await postModel.find({}).sort({ _id: -1 }); // Default: get all posts
      }
      res.json(posts);
    } catch (err) {
      console.error(err); // Log the error to the console
      res
        .status(500)
        .json({ message: "An error occurred while fetching the posts." });
    }
  },
};

module.exports = postsControllers;
