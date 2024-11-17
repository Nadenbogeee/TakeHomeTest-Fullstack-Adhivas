// src/controllers/courseController.js
import Course from "../models/Course.js";

const courseController = {
  // Create new course
  createCourse: async (req, res) => {
    try {
      const { title, description, lecturer_name, credits, semester, department } = req.body;

      // Validation
      if (!title || !lecturer_name || !credits) {
        return res.status(400).json({
          error: "Please provide required fields (title, lecturer_name, credits)",
        });
      }

      const course = await Course.create({
        title,
        description,
        lecturer_name,
        credits,
        semester,
        department,
      });

      res.status(201).json({
        message: "Course created successfully",
        course,
      });
    } catch (error) {
      console.error("Create course error:", error);
      res.status(500).json({
        error: "Error creating course",
      });
    }
  },

  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.findAll();
      res.json(courses);
    } catch (error) {
      console.error("Get courses error:", error);
      res.status(500).json({
        error: "Error fetching courses",
      });
    }
  },

  // Get course by ID
  getCourseById: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        return res.status(404).json({
          error: "Course not found",
        });
      }
      res.json(course);
    } catch (error) {
      console.error("Get course error:", error);
      res.status(500).json({
        error: "Error fetching course",
      });
    }
  },

  // Update course
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        return res.status(404).json({
          error: "Course not found",
        });
      }

      await course.update(req.body);
      res.json({
        message: "Course updated successfully",
        course,
      });
    } catch (error) {
      console.error("Update course error:", error);
      res.status(500).json({
        error: "Error updating course",
      });
    }
  },

  // Delete course
  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        return res.status(404).json({
          error: "Course not found",
        });
      }

      await course.destroy();
      res.json({
        message: "Course deleted successfully",
        success: true,
      });
    } catch (error) {
      console.error("Delete course error:", error);
      res.status(500).json({
        error: "Error deleting course",
      });
    }
  },
};

export default courseController;
