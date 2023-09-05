import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes'
import connect from './db/db'
import checkToken from './middleware/authentication'

const app = express()
const port = process.env.PORT ?? 8000
const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: 'Content-Type',
  optionsSuccessStatus: 200
}

app.use(checkToken)
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser(process.env.COOKIE_SECRET as string))

app.use('/auth', authRouter)
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Credentials', 'true')
//   res.setHeader('Access-Control-Max-Age', '1800')
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
//   next()
// })

app.get('/', (req, res) => {
  res.send('Stan Management backend!')
})

app.listen(port, async () => {
  await connect()
  console.log(`Listening on port: ${port}`)
})
