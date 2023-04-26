import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

import { isAdmin, isHR, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing

//LOGIN || POST
router.post("/login", loginController);
router.post("/register", registerController);

//protected route auth
router.get("/check-auth", requireSignIn, (req, res) => {
  res.status(200).send({ success: true });
});

//protected route admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ success: true });
});

//protected route hr
router.get("/hr-auth", requireSignIn, isHR, (req, res) => {
  res.status(200).send({ success: true });
});
export default router;
