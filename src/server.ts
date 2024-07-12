import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from "./config/db"

import projectRoutes from './routes/projectRoutes'
import authRoutes from './routes/authRoutes'
import morgan from "morgan"

dotenv.config()

connectDB()

const app = express()
app.use(cors())

console.log('frontend', process.env.FRONTEND_URL)

//Logging
app.use(morgan('dev'))

//Habilitar la lectura json
app.use(express.json())

//ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app