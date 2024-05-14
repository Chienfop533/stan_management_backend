import { authService } from '@/services'
import { attachCookiesToResponse, createRefreshToken } from '@/utils/jwt'
import { Profile, VerifyCallback } from 'passport-google-oauth20'

const verifyGoogle = async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
  try {
    const user = await authService.createUserPassport(profile, 'google')
    return cb(null, user)
  } catch (error: any) {
    return cb(error)
  }
}
const handleDataPassport = (user: any, res: any) => {
  const refreshToken = createRefreshToken(user)
  attachCookiesToResponse({ res, refreshToken, rememberMe: true })
}

const verifyGithub = async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
  try {
    const user = await authService.createUserPassport(profile, 'github')
    return cb(null, user)
  } catch (error: any) {
    return cb(error)
  }
}
export default { verifyGoogle, handleDataPassport, verifyGithub }
