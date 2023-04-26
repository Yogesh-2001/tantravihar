import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.role === 0) {
    const regex = /^[\w-\.]+@vit\.edu\.in$/;
    if (!regex.test(this.email)) {
      return next(new Error("please login with vit email address"));
    }
  }
  next();
});

export default mongoose.model("users", userSchema);
