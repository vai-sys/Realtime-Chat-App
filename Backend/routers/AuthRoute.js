import { Router } from "express";
import { signup } from "../controllers/AuthController.js"; 
import {login} from "../controllers/AuthController.js";
import { getUserInfo } from "../controllers/AuthController.js";

const AuthRoute = Router();

AuthRoute.post("/signup", signup);
AuthRoute.post("/login",login);
AuthRoute.get("/userInfo",getUserInfo)

export default AuthRoute;
