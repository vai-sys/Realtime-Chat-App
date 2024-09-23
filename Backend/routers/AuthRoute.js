
import { Router } from "express";
import { signup, login, getUserInfo,updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/Authmiddleware.js";

const AuthRoute = Router();

AuthRoute.post("/signup", signup);
AuthRoute.post("/login", login);
AuthRoute.get("/userInfo", verifyToken, getUserInfo);
AuthRoute.post('/update-profile',verifyToken,updateProfile);


export default AuthRoute;