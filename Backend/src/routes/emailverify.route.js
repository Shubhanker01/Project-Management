import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifyEmail,resendEmailVerification } from "../controllers/auth.controller.js";

const router = Router()
router.route("/verify-email/:token").get(verifyEmail)
// secure route
router.route("/resend-email-verification").get(verifyJwt,resendEmailVerification)

export default router