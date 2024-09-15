import { Router } from "express";
import { signup } from "../controllers/AuthController.js"; 
import {login} from "../controllers/AuthController.js";

const AuthRoute = Router();

AuthRoute.post("/signup", signup);
AuthRoute.post("/login",login);

export default AuthRoute;
