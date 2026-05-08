import mongoose from 'mongoose'

async function connectToDB() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        if (connection) {
            console.log("Mongoose successfully connected")
        }
    } catch (error) {
        console.log(error)
    }
}

export default connectToDB