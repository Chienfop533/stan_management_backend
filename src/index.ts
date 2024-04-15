import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import session from 'express-session'
import { authRouter, scrumboardDetailRouter, scrumboardRouter } from './routes'
import connect from './db/db'
import checkToken from './middleware/authentication'
import cors from 'cors'
import passport from 'passport'
import '@/config/passport'

const app = express()
const port = process.env.PORT ?? 8000
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser(process.env.COOKIE_SECRET as string))
// setup session
app.use(
  session({
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: true
  })
)

//Setup passport
app.use(passport.initialize())
app.use(passport.session())

//Middleware
app.use(checkToken)
//Route
app.use('/auth', authRouter)
app.use('/scrumboard', scrumboardRouter)
app.use('/scrumboard-detail', scrumboardDetailRouter)

app.get('/', (req, res) => {
  res.send('Stan Management backend!')
})

app.listen(port, async () => {
  await connect()
  console.log(`Listening on port: ${port}`)
})
