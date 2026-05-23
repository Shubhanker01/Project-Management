import { getProjects, updateProject, createProject, deleteProject, getProjectById, addMemberToProject, getProjectMembers, updateMemberRole, deleteMemberRole } from "../controllers/project.controller.js"
import { Router } from "express"
import { validate } from "../middlewares/validator.middleware.js"
import { createProjectValidator, addMemberToProjectValidator } from "../validators/projectValidator.js"
import { verifyJwt, validateProjectPermission } from "../middlewares/auth.middleware.js"


const router = Router()
router.use(verifyJwt)

router.route("/").get(getProjects).post(createProjectValidator(), validate, createProject)




export default router