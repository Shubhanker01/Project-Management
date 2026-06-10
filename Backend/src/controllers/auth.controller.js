// importing user
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/async-handler.js'
import { emailVerificationContent, sendEmail, passwordResetContent } from '../utils/mailgen.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

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
            `${process.env.CLIENT_URL}/email-verify/${unHashedToken}`
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
        httpOnly: true
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
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    // check if the user is already verified
    if (user.isEmailVerified) {
        throw new ApiError(409, "Email is already verified")
    }

    // generate new temporary token
    let { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()
    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })
    await sendEmail({
        email: user?.email,
        subject: "Please Verify your Email",
        mailgenContent: emailVerificationContent(
            user.username,
            `${process.env.CLIENT_URL}/email-verify/${unHashedToken}`
        )
    })
    return res.status(200).json(
        new ApiResponse(200, "", { message: "Email successfully sent" })
    )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Access")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        // if incoming refresh token is not present in user's database
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired")
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user?._id)
        user.refreshToken = refreshToken
        await user.save()
        return res.status(200).cookie('accessToken', accessToken, options).cookie('refreshToken', refreshToken, options).json(
            new ApiResponse(
                200,
                { accessToken: accessToken, refreshToken: refreshToken }
            )
        )
    } catch (error) {
        throw new ApiError(401, "Unauthorized Access")
    }
})

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
    // grab email
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    let { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()
    user.forgotPasswordToken = hashedToken
    user.forgotPasswordExpiry = tokenExpiry
    await user.save({ validateBeforeSave: false })
    // email sent
    await sendEmail({
        email: user?.email,
        subject: "Please Verify your Email",
        mailgenContent: passwordResetContent(user?.username, `${process.env.FORGOT_PASSWORD_RESET_URL}/${unHashedToken}`)
    })
    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset mail has been sent successfully")
    )
})

// change password
const changePassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params
    const { newPassword } = req.body
    let hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    user.forgotPasswordToken = null
    user.forgotPasswordExpiry = null
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(
        new ApiResponse(200, {}, "Password Reset successfull")
    )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isPasswordValid = user.passwordValidate(oldPassword)
    if (!isPasswordValid) {
        throw new ApiError(401, "Unauthorized")
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully")
    )
})



export { registerUser, login, logout, getCurrentUser, verifyEmail, resendEmailVerification, refreshAccessToken, forgotPassword, changePassword,changeCurrentPassword }