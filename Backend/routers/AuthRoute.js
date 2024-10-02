

import { Router } from "express";
import {
  signup,
  login,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,logout
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/Authmiddleware.js";
import multer from "multer";
import path from "path";

const AuthRoute = Router();

AuthRoute.post("/signup", signup);
AuthRoute.post("/login", login);
AuthRoute.get("/userInfo", verifyToken, getUserInfo);
AuthRoute.put('/update-profile', verifyToken, updateProfile);



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

AuthRoute.post('/add-profile-image', verifyToken, upload.single("image"), addProfileImage);

AuthRoute.delete("/remove-profile-image", verifyToken, removeProfileImage);

AuthRoute.post("/logout",logout);

export default AuthRoute;