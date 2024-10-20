const { User } = require("../models/user");

const userControllers = {
  get: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.json(user.toJSON());
    } catch (err) {
      console.log({ err });
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },
};

const userDataControllers = {
  post: async (req, res) => {
    try {
      const { bio } = req.body;

      const userData = await User.findByIdAndUpdate(
        req.user._id,
        { bio },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.json(userData);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          message: "An error occurred while updating the user.",
          error: err.message,
        });
    }
  },
};

module.exports = { userControllers, userDataControllers };
