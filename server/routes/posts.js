const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getAllPosts);
router.get("/search", searchPosts);
router.get("/:id", getPost);

router.post("/", protect, upload.single("featuredImage"), createPost);

router.put("/:id", protect, upload.single("featuredImage"), updatePost);

router.delete("/:id", protect, deletePost);

router.post("/:id/comments", protect, addComment);

module.exports = router;
