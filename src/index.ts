import express from 'express'
import * as dotenv from 'dotenv'
import { authRouter } from './routes'

dotenv.config()
const app = express()
const port = process.env.PORT ?? 3000
app.use(express.json())

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Stan Management backend!')
})

app.listen(port, async () => {
  console.log(`Listening on port: ${port}`)
})
