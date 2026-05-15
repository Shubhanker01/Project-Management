// importing user
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/api-error.js'
import { ApiResponse } from '../utils/api-response.js'
import { asyncHandler } from '../utils/async-handler.js'
import { emailVerificationContent, sendEmail } from '../utils/mailgen.js'

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

export { registerUser }