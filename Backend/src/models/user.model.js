import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localPath: String
        },
        default: {
            url: 'https://placehold.co/200x200/png',
            localPath: ''
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    }

}, {
    timestamps: true
})

// defining prehook
userSchema.pre("save", async function () {
    // when not changing the password move immediately to next
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password)
    next()
})

userSchema.methods.passwordValidate = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generate access and refresh token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(10).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(unHashedToken)

    const tokenExpiry = Date.now() + (20 * 60 * 1000) // 20 minutes+current time
    return { unHashedToken, hashedToken, tokenExpiry }

}

export const User = mongoose.model("User", userSchema)