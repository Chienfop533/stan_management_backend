import { authService } from '@/services'
import { LoginReq, RegisterReq } from '@/types/authType'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
  attachCookiesToResponse,
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
} from '@/utils/jwt'

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password, rememberMe } = req.body as LoginReq
  try {
    const existingUser = await authService.login({ email, password, rememberMe })
    const accessToken = createAccessToken(existingUser)
    const refreshToken = createRefreshToken(existingUser)
    attachCookiesToResponse({ res, refreshToken, rememberMe })
    res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: { ...existingUser, password: 'hide' },
      accessToken: accessToken
    })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}

const register = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { avatar, fullName, email, password } = req.body as RegisterReq
  try {
    const user = await authService.register({ avatar, fullName, email, password })
    res.status(201).json({ success: true, message: 'Register successfully', data: user })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const logout = async (req: Request, res: Response) => {
  res.clearCookie('refresh_token')
  res.status(200).json({ success: true, message: 'Logout successfully' })
}
const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.signedCookies
  if (!cookies?.refreshToken) return res.status(401).json({ success: false, message: 'Unauthorized' })
  try {
    const jwtObject: any = verifyRefreshToken(cookies?.refreshToken as string)
    const accessToken = createAccessToken(jwtObject.data)
    res.status(200).json({ success: true, message: 'Refresh token successfully', accessToken: accessToken })
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message })
  }
}
const verifyToken = async (req: Request, res: Response) => {
  const accessToken = req.headers?.authorization?.split(' ')[1]
  try {
    const jwtObject: any = verifyAccessToken(accessToken as string)
    res.status(200).json({
      success: true,
      message: 'Verify access token successfully',
      data: { ...jwtObject.data, password: 'hide' }
    })
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message })
  }
}

export default { login, register, logout, refreshToken, verifyToken }
