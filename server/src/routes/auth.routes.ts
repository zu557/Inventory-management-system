
import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {loginUser , registerUser} from "../controllers/auth.controller.js"
import { permit } from "../middleware/rbac.js";

const router = Router();
router.post("/register",authenticate, permit("ADMIN"), registerUser);
router.post("/login", loginUser);

export default router;
