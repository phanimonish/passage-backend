const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authControllers = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ err: "User does not exist" });

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { user: user._id, username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({ msg: "Login successful", token });
      }
      return res.status(400).json({ err: "Login unsuccessful" });
    } catch (err) {
      console.log({ err });
      res.status(400).send(err);
    }
  },

  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const userWithUsername = await User.findOne({ username });
      const userWithEmail = await User.findOne({ email });
      if (userWithUsername || userWithEmail)
        return res
          .status(400)
          .json({ msg: "User with email or username already exist" });

      const hash = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );

      const user = new User({ username, email, password: hash });

      if (user) {
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        await user.save();
        return res.status(200).json({ msg: "Registration successful", token });
      }
      return res.status(400).json({ err: "Registration unsuccessful" });
    } catch (err) {
      console.log({ err });
      res.status(400).send(err);
    }
  },
};

module.exports = authControllers;
