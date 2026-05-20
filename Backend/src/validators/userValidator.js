import { body } from "express-validator";
const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is Required")
            .isEmail()
            .withMessage("The given format is not an email"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({ min: 3 })
            .withMessage("Username must be atleast 3 characters"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
    ]
}

const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is Required")
            .isEmail()
            .withMessage("The given format is not an email"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
    ]
}
// current change password validator
const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword")
            .trim()
            .notEmpty()
            .withMessage("Old Password is required"),
        body("newPassword")
            .trim()
            .notEmpty()
            .withMessage("New Password is required"),
    ]
}

// forgot password validator
const forgotPasswordValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is Required")
            .isEmail()
            .withMessage("The given format is not an email")
    ]
}

// reset forgot password validator
const resetForgotPasswordValidator = () => {
    return [
        body("newPassword")
            .trim()
            .notEmpty()
            .withMessage("New Password is required")
    ]
}

export { userRegisterValidator, userLoginValidator, userChangeCurrentPasswordValidator, forgotPasswordValidator, resetForgotPasswordValidator }