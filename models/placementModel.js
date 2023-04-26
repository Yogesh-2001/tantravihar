import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    jdfile: {
      type: String,
      required: true,
    },
    branchcriteria: {
      type: Array,
      default: [],
    },
    engAggrrpercentCriteria: {
      type: Number,
      default: NaN,
    },
    editorData: {
      type: String,
      required: true,
    },
    driveDate: {
      type: Date,
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    lastApplyDate: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      default: "Zoya Chaudhary",
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile-details",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("placement", placementSchema);
