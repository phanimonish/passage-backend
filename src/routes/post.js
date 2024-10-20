const express = require("express");
const { postControllers, upload } = require("../controllers/post");

const postRouter = express.Router();

postRouter.post("/", upload.single("image"), postControllers.post);

postRouter.get("/:postId", postControllers.getPostById);

postRouter.delete("/:postId", postControllers.deletePost);

postRouter.patch(
  "/:postId",
  upload.single("image"),
  postControllers.updatePost
);

module.exports = postRouter;
