import { Router } from "express"
import { validate } from "../middlewares/validator.middleware.js"
import { createProjectValidator, addMemberToProjectValidator } from "../validators/projectValidator.js"
import { verifyJwt, validateProjectPermission } from "../middlewares/auth.middleware.js"
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js"
import { upload } from "../middlewares/multer.middleware.js"
import { createTask, getTasks, updateTask, deleteTask, getTaskById, assignedTasks } from "../controllers/task.controller.js"


const router = Router()
router.use(verifyJwt)

router.route("/:projectId")
    .post(upload.fields([{ name: "attachments", maxCount: 2 }]), createTask)
    .get(getTasks)

router.route("/:projectId/task/:taskId")
    .post(updateTask)
    .delete(deleteTask)

router.route("/:taskId").get(getTaskById)
router.route("/assigned/:userId").get(assignedTasks)

export default router