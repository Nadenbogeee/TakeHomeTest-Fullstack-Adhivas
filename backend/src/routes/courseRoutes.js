import express from "express";
import courseController from "../controllers/courseController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, courseController.createCourse);
router.get("/", auth, courseController.getAllCourses);
router.get("/:id", auth, courseController.getCourseById);
router.put("/:id", auth, courseController.updateCourse);
router.delete("/:id", auth, courseController.deleteCourse);

export default router;
