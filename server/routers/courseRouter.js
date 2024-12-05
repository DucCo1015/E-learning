import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {creteCourse,editCourse,getCreatorCourses} from '../controller/courseController.js'
import upload from '../utils/multer.js';


const router = express.Router();

router.route("/").post(isAuthenticated,creteCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);

export default router;