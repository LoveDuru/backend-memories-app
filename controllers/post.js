import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    res.status(400).json({ message: error.message });
    console.error("GET POSTS ERROR:", error); // <--- ADD THIS
    //  res.status(400).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log("req body", post);
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      console.log("Invalid ID detected");
      return res.status(404).send("no post with that id");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    console.log("Update Success:", updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("Invalid ID");
    }
    await PostMessage.findByIdAndDelete(id);
    res.json({ id }); // ✅ IMPORTANT
    console.log("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("invalid ID");
    }
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
