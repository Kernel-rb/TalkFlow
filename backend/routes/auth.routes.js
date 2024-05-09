import express from "express";

import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// auth routes 
router.post("/login", login );
router.post("/register", register );
router.post("/logout", logout );

export default router;