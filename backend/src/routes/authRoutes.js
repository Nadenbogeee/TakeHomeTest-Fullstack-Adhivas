// src/routes/authRoutes.js
import express from "express";
import authController from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post(
  "/upload-profile-picture",
  auth, // Middleware autentikasi
  upload.single("profilePicture"), // Middleware unggah file
  authController.updateProfilePicture // Controller untuk menangani permintaan
);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", auth, authController.getProfile);
router.put("/profile-picture", auth, upload.single("profilePicture"), authController.uupdateProfilePicture);
router.delete("/profile-picture", auth, authController.deleteProfilePicture);

// router.post("/upload-profile-picture", auth, upload.single("profilePicture"), authController.updateProfilePicture);

export default router;
