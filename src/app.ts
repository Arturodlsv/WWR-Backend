import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

//importing routes
import userRoutes from './routes/user.routes'
app.use('/user', userRoutes)

//declaring the port and initiating the server
const port = process.env.APP_PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port} 🤠👌`)
})
