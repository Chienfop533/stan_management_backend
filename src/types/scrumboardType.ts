export interface ScrumboardTypeReq {
  image: string
  title: string
  description?: string
  startDate: Date
  dueDate?: Date
  type: 'public' | 'private'
}
