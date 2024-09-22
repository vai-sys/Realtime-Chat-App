
import { Router } from "express";
import { signup, login, getUserInfo } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/Authmiddleware.js";

const AuthRoute = Router();

AuthRoute.post("/signup", signup);
AuthRoute.post("/login", login);
AuthRoute.get("/userInfo", verifyToken, getUserInfo);

export default AuthRoute;