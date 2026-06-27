import { User } from '../models/user.model.js'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/async-handler.js'
import { Project } from '../models/project.model.js'
import { ProjectMember } from '../models/projectmember.model.js'
import mongoose from 'mongoose'
import { UserRolesEnum } from '../utils/constants.js'
import { Task } from '../models/task.model.js'
import { SubTask } from '../models/subtask.model.js'
import { uploadToS3 } from '../utils/uploadToS3.js'

const getTasks = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(404, "Project Not Found")
    }

    const tasks = await Task.find({ project: project._id }).populate("assignedTo", "avatar username fullname")
    return res.status(200).json(
        new ApiResponse(200, tasks || [], "Tasks fetched Successfully")
    )
})

const getTaskById = asyncHandler(async (req, res) => {
    const { taskId } = req.params

    const task = await Task.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(taskId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo",
                pipeline: [
                    {
                        _id: 1,
                        username: 1,
                        fullName: 1,
                        avatar: 1
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "subtasks",
                localField: "task",
                foreignField: "_id",
                as: "subtasks",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "createdBy",
                            foreignField: "_id",
                            as: "createdBy",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        username: 1,
                                        fullName: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        },
                        $addFields: {
                            createdBy: {
                                $arrayElemAt: ["$createdBy", 0]
                            }
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                assignedTo: {
                    $arrayElemAt: ["$assignedTo", 0]
                }
            }
        }

    ])

    if (!task || task.length == 0) {
        throw new ApiError(404, "Task not found")
    }
    return res.status(200).json(
        new ApiResponse(200, task, "Task fetched successfully")
    )

})

const assignedTasks = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const tasks = await Task.aggregate([
        {
            $match: {
                assignedTo: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "projectDetails"
            }
        },
        {
            $unwind: "$projectDetails"
        }
    ])
    if (!tasks) {
        throw new ApiError(404, "Tasks not found")
    }
    return res.status(200).json(
        new ApiResponse(200, tasks, "Task fetched successfully")
    )
})

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, assignedTo } = req.body
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404, "Project Not Found")
    }
    let files = req.files.attachments || []
    files = await Promise.all(files.map(async (file) => {
        const url = await uploadToS3(file.path, file.originalname)
        return {
            url: url,
            size: file.size
        }
    }))
    const task = await Task.create({
        title: title,
        description: description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: new mongoose.Types.ObjectId(assignedTo),
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        status: status,
        attachments: files
    })

    if (!task) {
        throw new ApiError(400, "Task not created")
    }

    return res.status(201).json(
        new ApiResponse(201, task, "Task successfully created and assigned")
    )
})

const updateTask = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params
    const { title, description, status } = req.body

    let task = await Task.findById(taskId)
    if (!task) {
        throw new ApiError(404, "Task not found")
    }

    task = await Task.findByIdAndUpdate(taskId, {
        title: title || task.title,
        description: description || task.description,
        status: status || task.status
    }, { new: true })

    return res.status(201).json(
        new ApiResponse(201, task, "Task successfully updated")
    )

})

const deleteTask = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params
    let task = await Task.findById(new mongoose.Types.ObjectId(taskId))

    if (!task) {
        throw new ApiError(404, "Task not found")
    }

    task = await Task.findByIdAndDelete(new mongoose.Types.ObjectId(taskId))
    return res.status(200).json(
        new ApiResponse(200, task, "Task Successfully deleted")
    )
})

const createSubTask = asyncHandler(async (req, res) => {

})

const updateSubTask = asyncHandler(async (req, res) => {

})

const deleteSubTask = asyncHandler(async (req, res) => {

})

export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask,
    assignedTasks
}





