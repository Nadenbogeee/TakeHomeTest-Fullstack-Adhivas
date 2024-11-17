// src/controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- register start
const register = async (req, res) => {
  try {
    // Validasi input
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Please provide username and password",
      });
    }

    // Cek username sudah terdaftar
    const existingUser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Username already registered",
      });
    }

    // Buat user baru
    const user = await User.create({
      username,
      password,
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Error registering user",
    });
  }
};

// --- register end

// --- login start
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        error: "Please provide username and password",
      });
    }

    // Cari user
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid login credentials",
      });
    }

    // Validasi password
    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid login credentials",
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Error logging in",
    });
  }
};

// --- login end

// --- upload image

// src/controllers/authController.js

const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Please upload an image",
      });
    }

    // Log untuk debugging
    console.log("File uploaded:", req.file);
    console.log("User:", req.user);

    const filePath = `/uploads/${req.file.filename}`;

    // Hapus file lama jika ada
    if (req.user.profile_picture) {
      const oldFilePath = path.join(__dirname, "../../", req.user.profile_picture);
      try {
        await fs.unlink(oldFilePath);
        console.log("Old file deleted successfully");
      } catch (error) {
        console.error("Error deleting old profile picture:", error);
      }
    }

    // Update user's profile picture
    await req.user.update({
      profile_picture: filePath,
    });

    console.log("Database updated successfully");

    res.json({
      message: "Profile picture updated successfully",
      profile_picture: filePath,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Error uploading profile picture: " + error.message,
    });
  }
};

// --- upload image

const uupdateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Please upload an image",
      });
    }

    const filePath = `/uploads/${req.file.filename}`;

    // Hapus file lama jika ada
    if (req.user.profile_picture) {
      const oldFilePath = path.join(__dirname, "../../", req.user.profile_picture);
      try {
        await fs.unlink(oldFilePath);
        console.log("Old file deleted successfully");
      } catch (error) {
        console.error("Error deleting old profile picture:", error);
      }
    }

    // Update user's profile picture
    await req.user.update({
      profile_picture: filePath,
    });

    res.json({
      message: "Profile picture updated successfully",
      profile_picture: filePath,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Error uploading profile picture: " + error.message,
    });
  }
};

const deleteProfilePicture = async (req, res) => {
  try {
    // Cek apakah user memiliki profile picture
    if (!req.user.profile_picture) {
      return res.status(400).json({
        error: "No profile picture to delete",
      });
    }

    // Hapus file dari storage
    const filePath = path.join(__dirname, "../../", req.user.profile_picture);
    try {
      await fs.unlink(filePath);
      console.log("Profile picture file deleted successfully");
    } catch (error) {
      console.error("Error deleting profile picture file:", error);
    }

    // Update database: set profile_picture to null
    await req.user.update({
      profile_picture: null,
    });

    res.json({
      message: "Profile picture deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      error: "Error deleting profile picture",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // req.user sudah diset oleh middleware auth
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        profile_picture: req.user.profile_picture,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching profile",
    });
  }
};

export default {
  register,
  login,
  getProfile,
  updateProfilePicture,
  uupdateProfilePicture,
  deleteProfilePicture,
};
