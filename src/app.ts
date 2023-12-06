console.clear()
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const port = process.env.APP_PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port} 🤠👌`)
})
