import bcrypt from 'bcrypt'
import { UserModel } from '@/models'
import { LoginReq, RegisterReq } from '@/types/authType'
import { Profile } from 'passport'

const login = async ({ email, password, rememberMe }: LoginReq) => {
  const existingUser = await UserModel.findOne({ email }).exec()
  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password as string)
    if (isMatch) {
      return { ...existingUser.toObject() }
    } else {
      throw new Error('Wrong email or password')
    }
  } else {
    throw new Error('Wrong email or password')
  }
}
const register = async ({ avatar, fullName, email, password }: RegisterReq) => {
  const existingUser = await UserModel.findOne({ email }).exec()
  if (existingUser) {
    throw new Error('User already exist')
  }
  const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_OR_ROUNDS as string))
  const newUser = await UserModel.create({ avatar, fullName, email, password: hashPassword })
  return { ...newUser.toObject(), password: 'hide' }
}
const createUserPassport = async (profile: Profile) => {
  const existingUser = await UserModel.findOne({ googleId: profile.id }).exec()
  if (existingUser) {
    return existingUser
  } else {
    const newUser = await UserModel.create({
      avatar: (profile.photos as any)[0].value,
      fullName: profile.displayName,
      email: (profile.emails as any)[0].value,
      googleId: profile.id
    })
    return newUser
  }
}

export default { login, register, createUserPassport }
