import { getProjects, updateProject, createProject, deleteProject, getProjectById, addMemberToProject, getProjectMembers, updateMemberRole, deleteMemberRole } from "../controllers/project.controller.js"
import { Router } from "express"
import { validate } from "../middlewares/validator.middleware.js"
import { createProjectValidator, addMemberToProjectValidator } from "../validators/projectValidator.js"
import { verifyJwt, validateProjectPermission } from "../middlewares/auth.middleware.js"
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js"

const router = Router()
router.use(verifyJwt)

router.route("/").get(getProjects).post(createProjectValidator(), validate, createProject)

router
    .route("/:projectId")
    .get(validateProjectPermission(AvailableUserRoles), getProjectById)
    .put(validateProjectPermission([UserRolesEnum.PROJECT_ADMIN]),
    createProjectValidator(),
    validate,
    updateProject)
    .delete(validateProjectPermission([UserRolesEnum.PROJECT_ADMIN]), deleteProject)

router
    .route("/:projectId/members")
    .get(getProjectMembers)
    .post(
        validateProjectPermission([UserRolesEnum.PROJECT_ADMIN]),
        addMemberToProjectValidator(),
        validate,
        addMemberToProject
    )

router
    .route("/:projectId/members/:userId")
    .put(validateProjectPermission([UserRolesEnum.PROJECT_ADMIN]),
        updateMemberRole
    )
    .delete(
        validateProjectPermission([UserRolesEnum.PROJECT_ADMIN]),
        deleteMemberRole
    )

export default router