import bcrypt from 'bcrypt'
import { UserModel } from '@/models'
import { LoginReq, RegisterReq } from '@/types/authType'

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

export default { login, register }
