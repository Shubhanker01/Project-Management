import { User } from '../models/user.model.js'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/async-handler.js'
import { Project } from '../models/project.model.js'
import { ProjectMember } from '../models/projectmember.model.js'
import mongoose from 'mongoose'
import { UserRolesEnum } from '../utils/constants.js'

const getProjects = asyncHandler(async (req, res) => {
    // get all information related to projects fetched by userid
    const projects = await ProjectMember.aggregate([
        // 1st pipeline
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        // 2nd pipeline
        {
            // fetch the project from project collection whose Id matches
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "projects",
                pipeline: [
                    {
                        // fetches all the member of the project
                        $lookup: {
                            from: "projectmembers",
                            localField: "_id",
                            foreignField: "project",
                            as: "projectmembers"
                        }
                    },
                    {
                        // adds a new field containing no of members
                        $addFields: {
                            members: {
                                $size: "$projectmembers"
                            }
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$projects"
        },
        // {
        //     $project: {
        //         project: {
        //             _id: 1,
        //             name: 1,
        //             description: 1,
        //             members: 1,
        //             createdAt: 1,
        //             createdBy: 1
        //         },
        //         role: 1,
        //         _id: 0
        //     }
        // }
    ])

    return res.status(200).json(
        new ApiResponse(200, projects, "Projects fetched Successfully")
    )
})

const updateProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404, "Project not found")
    }
    project.name = name || project.name
    project.description = description || project.description
    await project.save()
    return res.status(200).json(
        new ApiResponse(200, project, "Project Updated Successfully")
    )
})

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const { _id } = req.user
    if (!_id) {
        throw new ApiError(404, "User not found")
    }
    const project = await Project.create({
        name: name,
        description: description,
        createdBy: new mongoose.Types.ObjectId(_id)
    })
    if (!project) {
        throw new ApiError(500, "Internal Error Occured While saving")
    }
    // creation of project should be admin
    await ProjectMember.create({
        user: new mongoose.Types.ObjectId(_id),
        project: project._id,
        role: UserRolesEnum.PROJECT_ADMIN
    })

    return res.status(201).json(
        new ApiResponse(201, project, "Project created successfully")
    )
})

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const deletedProject = await Project.findByIdAndDelete(projectId)
    return res.status(200).json(
        new ApiResponse(200, deletedProject, "Successfully deleted project")
    )
})

const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const project = await Project.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(projectId),
            },
        },
        {
            $lookup: {
                from: "projectmembers",
                localField: "_id",
                foreignField: "project",
                as: "projectMembers",
            },
        },
        {
            $addFields: {
                "totalMembers": {
                    $size: "$projectMembers"
                }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "projectMembers.user",
                foreignField: "_id",
                as: "userDetails",
            },
        },
        {
            $project: {
                "userDetails.password": 0,
                "userDetails.isEmailVerified": 0,
                "userDetails.emailVerificationExpiry": 0,
                "userDetails.emailVerificationToken": 0,
                "userDetails.refreshToken": 0,
                "userDetails.createdAt": 0,
                "userDetails.updatedAt": 0,
            },
        },
    ])
    if (!project) {
        throw new ApiError(404, "Project Not Found")
    }
    return res.status(200).json(
        new ApiResponse(200, project, "Successfully fetched project")
    )
})
// add member to a particular project
const addMemberToProject = asyncHandler(async (req, res) => {
    const { email, role } = req.body
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    const user = await User.findOne({ email: email })
    if (!project || !user) {
        throw new ApiError(404, "Some Document Not Found")
    }

    await ProjectMember.create({
        user: new mongoose.Types.ObjectId(user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role: role
    })
    return res.status(201).json(
        new ApiResponse(201, {}, "User successfully added or updated")
    )
})

const getProjectMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(404, "Project Not Found")
    }
    const projectMembers = await ProjectMember.aggregate([
        //  1st pipeline
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
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
            }
        },
        {
            $addFields: {
                user: {
                    $arrayElemAt: ["$user", 0]
                }
            }
        },
        {
            $project: {
                project: 1,
                user: 1,
                role: 1,
                createdAt: 1,
                updatedAt: 1,
                _id: 0
            }
        }
    ])
    return res.status(200).json(
        new ApiResponse(200, projectMembers, "Project members fetched Successfully")
    )
})

// updating member role
const updateMemberRole = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params
    const { newRole } = req.body

    const projectMember = await ProjectMember.findOneAndUpdate({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    }, {
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
        role: newRole
    }, {
        new: true
    })
    if (!projectMember) {
        throw new ApiError(404, "Project Member Not found")
    }

    return res.status(200).json(
        new ApiResponse(200, projectMember, "Project Member role updated Successfully")
    )
})

const deleteMemberRole = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params
    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    })
    if (!projectMember) {
        throw new ApiError(404, "Project Member not found")
    }
    projectMember = await ProjectMember.findOneAndDelete({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    })
    return res.status(200).json(
        new ApiResponse(200, projectMember, "Project Member role deleted Successfully")
    )
})

export { getProjects, updateProject, createProject, deleteProject, getProjectById, addMemberToProject, getProjectMembers, updateMemberRole, deleteMemberRole }