import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { Request, NextFunction, Response } from 'express'

export default function checkToken(req: Request, res: Response, next: NextFunction) {
  if (
    req.url.toLowerCase().trim() == '/auth/login'.toLowerCase().trim() ||
    req.url.toLowerCase().trim() == '/auth/register'.toLowerCase().trim()
  ) {
    next()
    return
  }
  const accessToken = req.headers?.authorization?.split(' ')[1]
  try {
    const jwtObject: any = jwt.verify(accessToken as string, process.env.JWT_SECRET as Secret)
    const isExpired = Date.now() >= jwtObject?.exp * 1000
    if (isExpired) {
      res.status(401).json({
        message: 'Token is expired'
      })
      res.end()
    } else {
      next()
      return
    }
  } catch (error: any) {
    res.status(401).json({ message: error.message })
  }
}
