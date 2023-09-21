import { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

const createAccessToken = (user: any) => {
  return jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '30m'
  })
}

const createRefreshToken = (user: any) => {
  return jwt.sign({ data: user }, process.env.REFRESH_TOKEN_SECRET as Secret, {
    expiresIn: '60 days'
  })
}
const verifyAccessToken = (accessToken: string) => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret)
}
const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret)
}
const attachCookiesToResponse = ({
  res,
  refreshToken,
  remember_me
}: {
  res: Response
  refreshToken: string
  remember_me: boolean
}) => {
  if (remember_me) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 60
    })
  } else {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true
    })
  }
}
export { createAccessToken, createRefreshToken, attachCookiesToResponse, verifyRefreshToken, verifyAccessToken }
