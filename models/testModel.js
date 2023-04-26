import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  range: {
    type: Object,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Test", testSchema);
