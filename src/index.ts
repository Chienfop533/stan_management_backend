import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import { authRouter } from './routes'
import connect from './db/db'
import checkToken from './middleware/authentication'
import cors from 'cors'

const app = express()
const port = process.env.PORT ?? 8000
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser(process.env.COOKIE_SECRET as string))
app.use(checkToken)

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Stan Management backend!')
})

app.listen(port, async () => {
  await connect()
  console.log(`Listening on port: ${port}`)
})
