import express from 'express'
import { body } from 'express-validator'
import { authController, authPassport } from '@/controllers'
import passport from 'passport'
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
router.post('/refresh-token', authController.refreshToken)
router.post('/verify-token', authController.verifyToken)

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent'
  })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`
  }),
  function (req, res) {
    authPassport.handleDataGoogle(req.user, res)
    res.redirect(`${process.env.CLIENT_URL}`)
  }
)

export default router
