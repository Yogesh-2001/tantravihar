import mongoose from "mongoose";

const allPlacedStudentSchema = new mongoose.Schema(
  {
    placedStudentList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile-details",
        required: true,
      },
    ],
    driveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "placement",
      required: true,
    },
    packagePlaced: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("placed-student", allPlacedStudentSchema);
