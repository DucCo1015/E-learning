import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  creteCourse,
  editCourse,
  getCreatorCourses,
  getCourseById,
  createLecture,
  getCourseLecture,
  editLecture, 
  removeLecture,
} from "../controller/courseController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated, creteCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture)
//router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById)
export default router;
