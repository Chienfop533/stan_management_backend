import express from 'express'
import { body } from 'express-validator'
import { authController } from '@/controllers'
const router = express.Router()

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('remember_me').isBoolean(),
  authController.login
)
router.post('/register', authController.register)
router.get('/logout', authController.logout)

export default router
