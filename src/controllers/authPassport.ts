import { UserModel } from '@/models'
import { Profile, VerifyCallback } from 'passport-google-oauth20'

const verifyGoogle = async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
  try {
    const existingUser = await UserModel.findOne({ googleId: profile.id }).exec()
    if (existingUser) {
      console.log(existingUser)
    } else {
      const newUser = await UserModel.create({
        avatar: (profile.photos as any)[0].value,
        fullName: profile.displayName,
        email: (profile.emails as any)[0].value,
        googleId: profile.id
      })
    }
    return cb(null, profile)
  } catch (error: any) {
    return cb(error)
  }
}
export default { verifyGoogle }
