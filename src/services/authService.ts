import { LoginReq } from '@/types/authType'

const login = async ({ email, password, remember_me }: LoginReq) => {
  console.log('login')
}
export default { login }
