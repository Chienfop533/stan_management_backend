import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import { authRouter } from './routes'
import connect from './db/db'
import checkToken from './middleware/authentication'

const app = express()
const port = process.env.PORT ?? 3000

app.use(checkToken)
app.use(express.json())

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Stan Management backend!')
})

app.listen(port, async () => {
  await connect()
  console.log(`Listening on port: ${port}`)
})
