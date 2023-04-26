import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadDir = path.join(__dirname, "../uploads/profileimages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Define the file types and their corresponding MIME types
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

// Multer setup
const profileImgStorage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const profileImgUpload = multer({
  storage: profileImgStorage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
  fileFilter: function (req, file, cb) {
    if (imageMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});
