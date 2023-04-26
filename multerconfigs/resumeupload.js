import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadDir = path.join(__dirname, "../uploads/resumes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const resumeStorage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const resumeUpload = multer({
  storage: resumeStorage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Resume must be a PDF file");
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 },
});
