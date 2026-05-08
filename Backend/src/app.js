import express from 'express'
import cors from 'cors'
import healthCheckRouter from './routes/healthcheck.route.js'

const app = express()
const port = process.env.PORT || 4000

// basic configuration
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: '16kb', extended: true }))

// cors configuration
app.use(cors({
    origin: process.env.ORIGIN?.split(",") || "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// health check router
app.use('/api/v1/healthcheck',healthCheckRouter)

app.get('/', (req, res) => {
    res.send("Hello everyone")
})

export default app