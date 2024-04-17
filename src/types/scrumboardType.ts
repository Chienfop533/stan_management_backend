export interface ScrumboardTypeReq {
  _id?: string
  image: string
  title: string
  description?: string
  startDate: Date
  dueDate?: Date
  status?: string
  type: 'public' | 'private'
}
export interface BoardListType {
  _id: string
  title: string
  cardOrderIds: string[]
}
export interface OrderedCardType {
  listSource: BoardListType
  sourceIndex: number
  listDestination?: BoardListType
  destinationIndex: number
}
