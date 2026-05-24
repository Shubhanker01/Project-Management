import express from 'express'
import cors from 'cors'
import healthCheckRouter from './routes/healthcheck.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import verifyEmailRouter from './routes/emailverify.route.js'
import ProjectRouter from './routes/project.route.js'

const app = express()

const port = process.env.PORT || 4000

// basic configuration
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: '16kb', extended: true }))
app.use(cookieParser())
// cors configuration
app.use(cors({
    origin: process.env.ORIGIN?.split(",") || "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// health check router
app.use('/api/v1/healthcheck', healthCheckRouter)
// auth router
app.use('/api/v1/auth', authRouter)
// verify email router
app.use('/api/v1/users', verifyEmailRouter)
// project router
app.use('/api/v1/projects', ProjectRouter)

app.get('/', (req, res) => {
    res.send("Hello everyone")
})

export default app