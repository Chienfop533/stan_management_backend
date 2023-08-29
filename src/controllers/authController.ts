import { authService } from '@/services'
import { LoginReq } from '@/types/authType'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password, remember_me } = req.body as LoginReq
  await authService.login({ email, password, remember_me })
  res.status(200).json({ message: 'Login successfully' })
}

const register = async (req: Request, res: Response) => {
  res.status(201).json({ message: 'Register successfully' })
}
const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successfully' })
}

export default { login, register, logout }
