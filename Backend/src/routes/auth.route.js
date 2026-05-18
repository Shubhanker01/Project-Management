// route for authentication
import { registerUser, login, logout, verifyEmail } from "../controllers/auth.controller.js"
import { Router } from "express"
import { validate } from "../middlewares/validator.middleware.js"
import { userRegisterValidator, userLoginValidator } from "../validators/userValidator.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(userRegisterValidator(), validate, registerUser)

router.route("/login").post(userLoginValidator(), validate, login)
router.route("/logout").post(verifyJwt, logout)
// http://localhost:4000/api/v1/users/verify-email/8d54bd6d8c9ff04d78ac


export default router
