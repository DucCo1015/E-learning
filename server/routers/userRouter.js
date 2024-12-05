import express from 'express'
import { login, register,getUserProfile, logout, updateProfile } from '../controller/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../utils/multer.js'


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get( isAuthenticated,getUserProfile)
router.route("/profile/update").put( isAuthenticated,upload.single("profilePhoto"),updateProfile)
export default router;