const { User } = require("../models/user");

const userControllers = {
  get: async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      res.json(user.toJSON());
    } catch (err) {
      console.log({ err });
      res.status(400).send(err);
    }
  },
};

module.exports = userControllers;
