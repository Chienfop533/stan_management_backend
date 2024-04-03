import mongoose, { Schema } from 'mongoose'

export default mongoose.model(
  'Scrumboard',
  new Schema(
    {
      image: { type: String, required: true },
      title: { type: String, required: true },
      description: String,
      startDate: Date,
      dueDate: Date,
      status: {
        type: String,
        enum: ['init', 'active', 'complete', 'late', 'pause'],
        required: true
      },
      type: {
        type: String,
        enum: ['public', 'private'],
        required: true
      },
      listOrderIds: [
        {
          type: Schema.Types.ObjectId
        }
      ],
      list: [
        {
          id: Schema.Types.ObjectId,
          title: { type: String, required: true },
          cardOrderIds: [
            {
              type: Schema.Types.ObjectId
            }
          ]
        }
      ]
    },
    { timestamps: true }
  )
)
