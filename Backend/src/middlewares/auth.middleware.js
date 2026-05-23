import { ApiError } from '../utils/api-error.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/async-handler.js'
import jwt from 'jsonwebtoken'
import { ProjectMember } from '../models/projectmember.model.js'
import mongoose from 'mongoose'

export const verifyJwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Token is missing")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")
        if (!user) {
            throw new ApiError(401, "Invalid Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access token")
    }

})

export const validateProjectPermission = (roles = []) => {
    asyncHandler(async (req, res, next) => {
        const { projectId } = req.params
        if (!projectId) {
            throw new ApiError(400, "Project ID is missing")
        }
        const projectMember = await ProjectMember.findOne({
            project: new mongoose.Types.ObjectId(projectId),
            user: req.user._id
        })
        if (!projectMember) {
            throw new ApiError(404, "Project not found")
        }
        const userRole = projectMember?.role
        req.user.role = userRole
        if (!roles.includes(userRole)) {
            throw new ApiError(403, "Access is forbidden")
        }

        next()
    })
}