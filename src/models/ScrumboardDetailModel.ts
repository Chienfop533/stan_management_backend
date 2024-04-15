import mongoose, { Schema } from 'mongoose'

export default mongoose.model(
  'ScrumboardDetail',
  new Schema(
    {
      scrumboardId: { type: Schema.Types.ObjectId, required: true },
      listId: { type: Schema.Types.ObjectId, required: true },
      image: String,
      title: { type: String, required: true },
      description: String,
      memberIds: { type: Array, default: [] },
      labels: { type: Array, default: [] },
      attachments: { type: Array, default: [] },
      todo: { type: Array, default: [] },
      comments: { type: Array, default: [] }
    },
    { timestamps: true }
  )
)
