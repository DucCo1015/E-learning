import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import {
  deleteMedialFormCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // patel214
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });
    }

    const isPasswordMath = await bcrypt.compare(password, user.password);

    if (!isPasswordMath) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Logout successfully  " });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to logout" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0];
      deleteMedialFormCloudinary(publicId);
    }

    const cloudResponse = await uploadMedia(profilePhoto.path);

    const photoUrl = cloudResponse.secure_url;

    const updateData = { name, photoUrl };
    const updateUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      userId: updateUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
