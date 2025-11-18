const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;

  const query = category ? { category } : {};

  const posts = await Post.find(query)
    .populate("author", "username email")
    .populate("category", "name")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findOne({
    $or: [{ _id: req.params.id }, { slug: req.params.id }],
  })
    .populate("author", "username")
    .populate("category", "name");

  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.incrementViewCount();

  res.json(post);
};

exports.createPost = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.featuredImage = req.file.filename;
    }

    data.author = req.user._id;

    const post = await Post.create(data);
    res.status(201).json(post);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.featuredImage = req.file.filename;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json(post);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};

exports.addComment = async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.id);

  await post.addComment(req.user._id, content);

  res.json(post);
};

exports.searchPosts = async (req, res) => {
  const q = req.query.q;

  const results = await Post.find({
    $or: [
      { title: new RegExp(q, "i") },
      { content: new RegExp(q, "i") },
    ],
  });

  res.json(results);
};
