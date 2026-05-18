import { Router } from "express";

import { verifyEmail } from "../controllers/auth.controller.js";

const router = Router()
router.route("/verify-email/:token").get(verifyEmail)

export default router