// importing user
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/async-handler.js'
import { emailVerificationContent, sendEmail } from '../utils/mailgen.js'
import crypto from 'crypto'

// generate access and refresh token
const generateAccessandRefreshToken = async (userId) => {
    try {
        let user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        // modify refreshToken
        user.refreshToken = refreshToken
        // save the user
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(
            500,
            "Some Error occured in the Server"
        )
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role, username } = req.body
    // check for the existed user grab either username or email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "Username already exists")
    }

    const user = await User.create({
        email: email,
        password: password,
        username: username,
        isEmailVerified: false
    })

    // now generate temporary token
    let { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })
    await sendEmail({
        email: user?.email,
        subject: "Please Verify your Email",
        mailgenContent: emailVerificationContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
        )
    })

    // remove some fields
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )
    // if createdUser is not present throw error
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})


// login user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const checkPassword = await user.passwordValidate(password)
    if (!checkPassword) {
        throw new ApiError(401, "Unauthorized please check your password")
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id)
    // remove some fields
    const existingUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )
    // if createdUser is not present throw error
    if (!existingUser) {
        throw new ApiError(500, "Something went wrong while fetching the user data!!!")
    }

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, existingUser, "User logged in successfully")
        )

})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: null
        }
    }, {
        new: true
    })
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User logged out successfully"))
})

// get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "Data fetched successfully")
    )
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params
    // token verify
    if (!token) {
        throw new ApiError(401, "Email Token is not found")
    }
    let hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    let user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() }
    })
    if (!user) {
        throw new ApiError(400, "Token is invalid or expired")
    }

    user.emailVerificationExpiry = null
    user.emailVerificationToken = null
    user.isEmailVerified = true
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(
        new ApiResponse(200, { isEmailVerified: true }, "Your Email is verified successfully")
    )

})

const resendEmailVerification = asyncHandler(async (req, res) => {
    // get user
    const user = await User.findById(req.user?._id)
    if(!user){
        throw new ApiError(401,"User not found")
    }
    // generate new temporary token
    
})

export { registerUser, login, logout, getCurrentUser, verifyEmail }