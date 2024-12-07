import express from "express";
import {
  editProfile,
  getProfile,
  logIn,
  logOut,
  register,
} from "../controllers/userController.js";
import isAuthenticate from "../middleware/authenticate.js";

import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/:id/profile", isAuthenticate, getProfile);
router.post(
  "/edit/profile",
  isAuthenticate,
  upload.single("profilePic"),
  editProfile
);

export default router;
