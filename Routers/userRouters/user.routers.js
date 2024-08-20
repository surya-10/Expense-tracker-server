import express from "express";
import { createUser, forgotPass, loginUser, updatePassword, verifyToken } from "../../controllers/userControllers/user.controller.js";

let authrouter = express.Router();

authrouter.post("/signup", createUser);
authrouter.post("/login", loginUser);
authrouter.post("/forgot", forgotPass);
authrouter.get("/token-verify/:id/:token", verifyToken);
authrouter.post("/update/:id", updatePassword);

export default authrouter;