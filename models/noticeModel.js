import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    editorData: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notices", noticeSchema);
