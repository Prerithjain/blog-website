// models/blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  blogname: String,
  authname: String,
  content: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export const Blog = mongoose.model("Blog", blogSchema);
