import express from "express";
import {
  getAllDrives,
  getParticularDrive,
  placeStudents,
} from "../controllers/hrController.js";

import { isHR, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

router.get("/get-all-drives/:id", requireSignIn, isHR, getAllDrives);
router.get("/get-partcular-drive/:id", requireSignIn, isHR, getParticularDrive);
router.post("/place-students", placeStudents);

export default router;
