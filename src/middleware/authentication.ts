import { Request, NextFunction, Response } from 'express'
import { verifyAccessToken } from '@/utils/jwt'

const listUrlNotAuth = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh-token',
  '/auth/logout',
  '/auth/google',
  '/auth/google/callback'
]
export default function checkToken(req: Request, res: Response, next: NextFunction) {
  if (listUrlNotAuth.some((url) => req.url.toLocaleLowerCase().trim().indexOf(url.toLocaleLowerCase().trim()) != -1)) {
    next()
    return
  }
  const accessToken = req.headers?.authorization?.split(' ')[1]
  try {
    verifyAccessToken(accessToken as string)
    next()
    return
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message })
  }
}
