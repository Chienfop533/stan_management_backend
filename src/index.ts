import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import session from 'express-session'
import { authRouter } from './routes'
import connect from './db/db'
import checkToken from './middleware/authentication'
import cors from 'cors'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import authPassport from './controllers/authPassport'

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
//Passport google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
      state: true
    },
    authPassport.verifyGoogle
  )
)
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user: any, done) => {
  done(null, user)
})

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent'
  })
)
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}/login/success`,
    failureRedirect: `${process.env.CLIENT_URL}/login`
  })
)
app.get('/login/success', async (res, req: any) => {
  console.log(req.user)
})

app.get('/', (req, res) => {
  res.send('Stan Management backend!')
})

app.listen(port, async () => {
  await connect()
  console.log(`Listening on port: ${port}`)
})
