import { UserModel } from '@/models'
import { Profile, VerifyCallback } from 'passport-google-oauth20'

const verifyGoogle = async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
  try {
    console.log(accessToken, refreshToken, profile)

    const existingUser = await UserModel.findOne({ googleId: profile.id }).exec()
  } catch (error: any) {
    return cb(error)
  }
}
export default { verifyGoogle }
