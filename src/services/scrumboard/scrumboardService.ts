import { ScrumboardModel } from '@/models'
import { BoardListType, ScrumboardType } from '@/types/scrumboardType'
import mongoose from 'mongoose'

const getAllScrumboard = async () => {
  const listScrumboard = await ScrumboardModel.find()
  return listScrumboard
}
const getScrumboardById = async (id: string) => {
  const scrumboardDetail = await ScrumboardModel.findById(id)
  return scrumboardDetail
}
const getScrumboardFilter = async (filter: any) => {
  const listScrumboard = await ScrumboardModel.find(filter)
  return listScrumboard
}
const createScrumboard = async (scrumboard: ScrumboardType) => {
  const newScrumboard = await ScrumboardModel.create({ ...scrumboard, listOrderIds: [] })
  return newScrumboard
}

const updateScrumboard = async (id: string, scrumboard: ScrumboardType) => {
  const updatedScrumboard = await ScrumboardModel.findByIdAndUpdate(id, scrumboard, { new: true })
  return updatedScrumboard
}
const deleteScrumboard = async (id: string) => {
  const scrumboard = await ScrumboardModel.findByIdAndDelete(id)
  return scrumboard
}

const addScrumboardList = async (scrumboardId: string, scrumboardList: { title: string }) => {
  const newObjectId = new mongoose.Types.ObjectId()
  const newScrumboardList = await ScrumboardModel.findByIdAndUpdate(
    scrumboardId,
    {
      $push: {
        listOrderIds: newObjectId,
        list: { _id: newObjectId, title: scrumboardList.title, cardOrderIds: [] }
      }
    },
    {
      new: true
    }
  )
  return newScrumboardList
}
const updateScrumboardList = async (scrumboardId: string, listId: string, scrumboardList: { title: string }) => {
  const updatedScrumboardList = await ScrumboardModel.findByIdAndUpdate(
    scrumboardId,
    { $set: { 'list.$[element].title': scrumboardList.title } },
    { new: true, arrayFilters: [{ 'element._id': listId }] }
  )
  return updatedScrumboardList
}
const deleteScrumboardList = async (scrumboardId: string, listId: string) => {
  const updatedScrumboardList = await ScrumboardModel.findByIdAndUpdate(
    scrumboardId,
    { $pull: { listOrderIds: listId, list: { _id: listId } } },
    { new: true }
  )
  return updatedScrumboardList
}
const updateScrumboardListOrder = async (scrumboardId: string, scrumboardList: { listOrderIds: string[] }) => {
  const updatedScrumboardList = await ScrumboardModel.findByIdAndUpdate(
    scrumboardId,
    { $set: { listOrderIds: scrumboardList.listOrderIds } },
    { new: true }
  )
  return updatedScrumboardList
}
const updateScrumboardCardOrder = async (scrumboardId: string, updatedList: BoardListType[]) => {
  const updatedScrumboardList = await ScrumboardModel.findByIdAndUpdate(
    scrumboardId,
    { $set: { list: updatedList } },
    { new: true }
  )
  return updatedScrumboardList
}
export default {
  createScrumboard,
  deleteScrumboard,
  updateScrumboard,
  getAllScrumboard,
  getScrumboardFilter,
  addScrumboardList,
  updateScrumboardList,
  deleteScrumboardList,
  updateScrumboardListOrder,
  getScrumboardById,
  updateScrumboardCardOrder
}
