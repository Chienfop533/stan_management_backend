import mongoose, { Schema } from 'mongoose'

export default mongoose.model(
  'BoardList',
  new Schema(
    {
      title: { type: String, required: true },
      amount: { type: Number, default: 0 },
      scrumboardId: { type: Schema.Types.ObjectId, required: true },
      cardOrderIds: [
        {
          type: Schema.Types.ObjectId
        }
      ]
    },
    { timestamps: true }
  )
)
