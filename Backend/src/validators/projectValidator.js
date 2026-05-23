import { body } from "express-validator";
import { AvailableUserRoles } from "../utils/constants.js";

const createProjectValidator = () => {
    return [
        body("name")
            .notEmpty()
            .withMessage("Name is Required"),
        body("description")
            .optional()
    ]
}

const addMemberToProjectValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is Required")
            .isEmail()
            .withMessage("The given format is not an email"),
        body("role")
            .notEmpty()
            .withMessage("Role is Empty")
            .isIn(AvailableUserRoles)
            .withMessage("Role is not available")
    ]
}


export { createProjectValidator, addMemberToProjectValidator }