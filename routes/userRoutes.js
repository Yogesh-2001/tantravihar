import express from "express";
import {
  createProfileCtrl,
  getAllDrives,
  getallplacedcompanies,
  getProfile,
  updateProfile,
  getDrive,
  applyDrive,
  getAllAppliedDrives,
  getProfileUrl,
  getAllTests,
  getAllAddedMaterial,
  getAllNotifications,
  markNotificationsRead,
  getNotices,
} from "../controllers/userController.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

//router object
const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "resume") {
      cb(null, path.join(__dirname, "../public/uploads/resumes"));
    } else {
      cb(null, path.join(__dirname, "../public/uploads/profileimages"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.fieldname === "resume") {
    if (!file.originalname.match(/\.(pdf)$/)) {
      req.fileValidationError = "Only pdf files are allowed!";
      return cb(new Error("Only pdf files are allowed!"), false);
    }
  }
  if (file.size > 2 * 1024 * 1024) {
    req.fileValidationError = "File size should not exceed 2MB!";
    return cb(new Error("File size should not exceed 2MB!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post(
  "/create-profile",
  upload.fields([
    { name: "photourl", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  createProfileCtrl
);
router.get("/get-all-drives", getAllDrives);
router.get("/get-profile-details/:id", getProfile);
router.get("/get-all-companies/:id", getallplacedcompanies);
router.put(
  "/update-profile",
  upload.fields([
    { name: "photourl", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);
router.get("/get-drive/:id", getDrive);
router.put("/apply-drive/:id", applyDrive);
router.get("/get-all-applied-drives/:id", getAllAppliedDrives);
router.get("/get-profile-url/:id", getProfileUrl);
router.get("/get-all-tests", getAllTests);
router.get("/get-all-materials", getAllAddedMaterial);
router.get("/get-all-notifications/:id", getAllNotifications);
router.put("/mark-all-read/:id", markNotificationsRead);
router.get("/get-all-notices", getNotices);
export default router;
