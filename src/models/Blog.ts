import mongoose, { Schema, model, models } from "mongoose";
import { Content } from "next/font/google";

const blogSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  Content: { type: String, required: true },
  number:{ type: Number, required: true },
description: { type: String, required: true },
link: { type: String, required: true },
});

const Blog = models.Blog || mongoose.model("Blog", blogSchema,"blog");
export default Blog;