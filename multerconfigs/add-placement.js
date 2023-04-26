import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadDir = path.join(__dirname, "../uploads/jds");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Define the file types and their corresponding MIME types
const fileTypes = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

// Multer setup
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export const addplacementUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 12, // 12 MB
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /pdf|doc|docx|xls|xlsx/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Only PDF, Excel and Word files are allowed!");
    }
  },
});
