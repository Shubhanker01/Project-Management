// route for authentication
import { registerUser, login } from "../controllers/auth.controller.js"
import { Router } from "express"
import { validate } from "../middlewares/validator.middleware.js"
import { userRegisterValidator } from "../validators/userValidator.js"

const router = Router()

router.route("/register").post(userRegisterValidator(), validate, registerUser)

router.route("/login").post(login)

export default router
