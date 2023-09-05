import { Request, NextFunction, Response } from 'express'
import { verifyAccessToken } from '@/utils/jwt'

export default function checkToken(req: Request, res: Response, next: NextFunction) {
  if (
    req.url.toLowerCase().trim() == '/auth/login'.toLowerCase().trim() ||
    req.url.toLowerCase().trim() == '/auth/register'.toLowerCase().trim() ||
    req.url.toLowerCase().trim() == '/auth/refreshToken'.toLowerCase().trim()
  ) {
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
