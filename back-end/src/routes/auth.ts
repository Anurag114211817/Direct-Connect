import { Router } from "express";
import { registerUser, loginUser, refreshAuthToken } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh-auth", refreshAuthToken);

export default router;
