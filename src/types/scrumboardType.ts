export interface ScrumboardType {
  _id?: string
  image?: string
  title: string
  description?: string
  startDate: Date
  dueDate?: Date
  status?: string
  type: 'public' | 'private'
  listOrderIds?: string[]
}
export interface BoardListType {
  _id?: string
  scrumboardId: string
  title: string
  amount?: number
  cardOrderIds?: string[]
}

export interface BoardCardType {
  _id: string
  scrumboardId: string
  listId: string
  image?: string
  title: string
  description?: string
  memberIds: string[]
  labels: any[]
  attachments: any[]
  todo: any[]
  comments: any[]
}

export interface OrderedCardType {
  listSourceId: string
  sourceIndex: number
  listDestinationId?: string
  destinationIndex: number
}
