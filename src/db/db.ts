import mongoose from 'mongoose'

async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connect mongodb successfully!')
    return connection
  } catch (error: any) {
    const { code } = error
    if (code == 8000) {
      throw new Error('Wrong username or password!')
    } else if (code == 'ENOTFOUND') {
      throw new Error('Wrong server name/connection string!')
    }
    throw new Error('Cannot connect to mongodb!')
  }
}
export default connect
