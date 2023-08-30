import { authService } from '@/services'
import { LoginReq, RegisterReq } from '@/types/authType'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password, remember_me } = req.body as LoginReq
  try {
    const existingUser = await authService.login({ email, password, remember_me })
    res.status(200).json({ success: true, message: 'Login successfully', data: existingUser })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}

const register = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { avatar, full_name, email, password } = req.body as RegisterReq
  try {
    const user = await authService.register({ avatar, full_name, email, password })
    res.status(201).json({ success: true, message: 'Register successfully', data: user })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successfully' })
}

export default { login, register, logout }
