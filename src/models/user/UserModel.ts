import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

export default mongoose.model(
  'User',
  new Schema(
    {
      avatar: { type: String, required: true },
      fullName: { type: String, required: true, minlength: [5, 'Full name must be at least 5 characters'] },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: (value: string) => validator.isEmail(value), message: 'Email is incorrect format' }
      },
      password: String,
      googleId: String,
      githubId: String
    },
    { timestamps: true }
  )
)
