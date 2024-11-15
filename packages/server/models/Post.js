import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
