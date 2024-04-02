import ScrumboardModel from '@/models/ScrumboardModel'
import { ScrumboardTypeReq } from '@/types/scrumboardType'

const getAllScrumboard = async () => {
  const listScrumboard = await ScrumboardModel.find()
  return listScrumboard
}

const createScrumboard = async (scrumboard: ScrumboardTypeReq) => {
  const newScrumboard = await ScrumboardModel.create({ ...scrumboard, listOrderIds: [], list: [] })
  return newScrumboard
}
const updateScrumboard = async (id: string, scrumboard: ScrumboardTypeReq) => {
  const updatedScrumboard = await ScrumboardModel.findByIdAndUpdate(id, scrumboard, { new: true })
  return updatedScrumboard
}
const deleteScrumboard = async (id: string) => {
  const scrumboard = await ScrumboardModel.findByIdAndDelete(id)
  return scrumboard
}
export default { createScrumboard, deleteScrumboard, updateScrumboard, getAllScrumboard }
