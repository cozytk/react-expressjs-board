import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  file_path: { type: String, required: true },
  file_size: { type: Number, required: true },
  file_type: { type: String, required: true },
});

const File = mongoose.model("File", fileSchema);
export default File;
