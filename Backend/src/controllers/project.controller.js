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
            $lookup: {
                from: "projects",
                localField: "projects",
                foreignField: "_id",
                as: "projects",
                pipeline: [
                    {
                        $lookup: {
                            from: "projectmembers",
                            localField: "_id",
                            foreignField: "projects",
                            as: "projectmembers"
                        }
                    },
                    {
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
            $unwind: "$project"
        },
        {
            $project: {
                project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    members: 1,
                    createdAt: 1,
                    createdBy: 1
                },
                role: 1,
                _id: 0
            }
        }
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

})

const addMemberToProject = asyncHandler(async (req, res) => {

})

const getProjectMembers = asyncHandler(async (req, res) => {

})

const updateMemberRole = asyncHandler(async (req, res) => {

})

const deleteMemberRole = asyncHandler(async (req, res) => {

})

export { getProjects, updateProject, createProject, deleteProject, getProjectById, addMemberToProject, getProjectMembers, updateMemberRole, deleteMemberRole }