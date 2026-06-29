import { showDashboard } from "../controllers/dashboard.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { Router } from 'express'

const router = Router()

router.route('/').get(verifyJwt, showDashboard)

export default router