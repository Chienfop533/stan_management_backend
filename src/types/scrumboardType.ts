export interface ScrumboardTypeReq {
  id?: string
  image: string
  title: string
  description?: string
  startDate: Date
  dueDate?: Date
  status?: string
  type: 'public' | 'private'
}
