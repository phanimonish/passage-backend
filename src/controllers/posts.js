const postModel = require("../models/post");

const postsControllers = {
  get: async (req, res) => {
    postModel.find({}).then((posts) => res.json(posts));
  },
};

module.exports = postsControllers