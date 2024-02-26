import express from 'express'
import { body } from 'express-validator'
import { authController } from '@/controllers'
const router = express.Router()

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('rememberMe').isBoolean(),
  authController.login
)
router.post(
  '/register',
  body('avatar').isLength({ min: 1 }),
  body('fullName').isLength({ min: 5 }),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  authController.register
)
router.delete('/logout', authController.logout)
router.post('/refreshToken', authController.refreshToken)
router.post('/verifyToken', authController.verifyToken)

export default router
