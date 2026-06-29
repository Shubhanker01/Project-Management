import { User } from '../models/user.model.js'
import { Project } from '../models/project.model.js'
import { Task } from '../models/task.model.js'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/async-handler.js'
import mongoose from 'mongoose'

const showDashboard = asyncHandler(async (req, res) => {
    const summary = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "projectmembers",
                localField: "_id",
                foreignField: "user",
                as: "topProjects"
            }
        },
        {
            $unset: ["avatar", "password", "username", "refreshToken", "isEmailVerified", "emailVerificationExpiry", "emailVerificationToken", "topProjects.user", "topProjects.role"]
        },
        {
            $addFields: {
                totalProjects: {
                    $size: "$topProjects"
                }
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "topProjects.project",
                foreignField: "_id",
                as: "userProjects",
                pipeline: [
                    { $sort: { createdAt: -1 } },
                    { $limit: 3 }
                ]
            }
        },
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "assignedTo",
                as: "tasks_assigned"
            }
        },
        {
            $addFields: {
                totalTasks: {
                    $size: "$tasks_assigned"
                }
            }
        },
        {
            $addFields: {
                completedTasks: {
                    $size: {
                        $filter: {
                            input: "$tasks_assigned",
                            as: "task",
                            cond: {
                                $eq: ["$$task.status", "done"]
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                userProjects: 1,
                tasks_assigned: 1,
                totalProjects: 1,
                totalTasks: 1,
                completedTasks: 1
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, summary, "Summary fetched successfully")
    )
})

export { showDashboard }