import mongoose from "mongoose";

const comentSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  replies: [
    {
      reply: String,
      user: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("chat-forum", comentSchema);
