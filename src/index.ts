import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import { authRouter } from './routes'
import connect from './db/db'
import checkToken from './middleware/authentication'
import cors from 'cors'
import { Strategy } from 'passport-google-oauth20'
import passport from 'passport'

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
//Middleware
app.use(checkToken)
//Route
app.use('/auth', authRouter)
//Passport google
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    (accessToken) => {
      console.log(accessToken)
    }
  )
)
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
app.get('/auth/google/callback', passport.authenticate('google'))

app.get('/', (req, res) => {
  res.send('Stan Management backend!')
})

app.listen(port, async () => {
  await connect()
  console.log(`Listening on port: ${port}`)
})
