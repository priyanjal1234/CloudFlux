import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import db from './config/db.js'

db()

// Route Imports
import awsRouter from './routes/aws.router.js'
import connectionRouter from './routes/connection.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/aws",awsRouter)

app.use("/api/connection",connectionRouter)

const port = process.env.PORT || 4000
app.listen(port,function() {
    console.log(`Server is running on port ${port}`)
})