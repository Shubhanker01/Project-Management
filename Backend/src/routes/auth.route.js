// route for authentication
import { registerUser, login, logout, verifyEmail, refreshAccessToken, forgotPassword, changePassword, getCurrentUser, changeCurrentPassword } from "../controllers/auth.controller.js"
import { Router } from "express"
import { validate } from "../middlewares/validator.middleware.js"
import { userRegisterValidator, userLoginValidator, forgotPasswordValidator, resetForgotPasswordValidator, userChangeCurrentPasswordValidator } from "../validators/userValidator.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"

const router = Router()
// unsecure routes
router.route("/register").post(userRegisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate, login)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgot-password").post(forgotPasswordValidator(), validate, forgotPassword)
router.route("/reset-forgot-password/:resetToken").post(resetForgotPasswordValidator(), validate, changePassword)



// secure routes
router.route("/logout").post(verifyJwt, logout)
router.route("/current-user").get(verifyJwt, getCurrentUser)
router.route("/change-current-password").post(verifyJwt, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword)


export default router
