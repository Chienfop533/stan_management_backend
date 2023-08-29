import express from 'express'
const router = express.Router()

router.post('/login', (req, res) => {
  res.send('POST login')
})
router.post('/register', (req, res) => {
  res.send('POST register')
})
router.get('/logout', (req, res) => {
  res.send('GET logout')
})

export default router
