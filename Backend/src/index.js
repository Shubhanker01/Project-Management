import 'dotenv/config'
import app from './app.js'
import connectToDB from './db/db.js'

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`)
})

connectToDB()