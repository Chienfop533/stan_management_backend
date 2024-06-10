import { BoardListModel, ScrumboardModel } from '@/models'
import { BoardListType } from '@/types/scrumboardType'

const getAllList = async () => {
  const boardList = await BoardListModel.find()
  return boardList
}
const getListById = async (id: string) => {
  const listDetail = await BoardListModel.findById(id)
  return listDetail
}
const addList = async (list: BoardListType) => {
  const newList = await BoardListModel.create({ ...list, amount: 0, cardOrderIds: [] })
  return newList
}

const updateList = async (id: string, list: BoardListType) => {
  const updatedList = await BoardListModel.findByIdAndUpdate(id, list, { new: true })
  return updatedList
}

// const getCardsByScrumboardId = async (scrumboardId: string) => {
//   const listCard = await BoardListModel.find({ scrumboardId: scrumboardId })
//   return listCard
// }
// const addCard = async (scrumboardId: string, scrumboardCard: { listId: string; title: string }) => {
//   const newCard = await BoardListModel.create({
//     scrumboardId: scrumboardId,
//     listId: scrumboardCard.listId,
//     title: scrumboardCard.title
//   })
//   await ScrumboardModel.findOneAndUpdate(
//     { _id: scrumboardId, 'list._id': scrumboardCard.listId },
//     { $push: { 'list.$.cardOrderIds': newCard._id } }
//   )
//   return newCard
// }
// const updateCardByListId = async (cardId: string, listId: string) => {
//   const updatedCard = await BoardListModel.findByIdAndUpdate(cardId, { $set: { listId: listId } })
//   return updatedCard
// }
// const deleteCard = async (cardId: string) => {
//   const deletedCard = await BoardListModel.findByIdAndDelete(cardId)
//   await ScrumboardModel.findOneAndUpdate(
//     { _id: deletedCard?.scrumboardId },
//     { $pull: { 'list.$.cardOrderIds': cardId } }
//   )
//   return deletedCard
// }

export default {
  getAllList,
  getListById,
  addList,
  updateList
}
