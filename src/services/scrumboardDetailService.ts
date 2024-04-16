import { ScrumboardDetailModel, ScrumboardModel } from '@/models'

const getCardsByScrumboardId = async (scrumboardId: string) => {
  const listCard = await ScrumboardDetailModel.find({ scrumboardId: scrumboardId })
  return listCard
}
const addCard = async (scrumboardId: string, scrumboardCard: { listId: string; title: string }) => {
  const newCard = await ScrumboardDetailModel.create({
    scrumboardId: scrumboardId,
    listId: scrumboardCard.listId,
    title: scrumboardCard.title
  })
  await ScrumboardModel.findOneAndUpdate(
    { _id: scrumboardId, 'list._id': scrumboardCard.listId },
    { $push: { 'list.$.cardOrderIds': newCard._id } }
  )
  return newCard
}
const deleteCard = async (cardId: string) => {
  const deletedCard = await ScrumboardDetailModel.findByIdAndDelete(cardId)
  await ScrumboardModel.findOneAndUpdate(
    { _id: deletedCard?.scrumboardId, 'list._id': deletedCard?.listId },
    { $pull: { 'list.$.cardOrderIds': cardId } }
  )
  return deletedCard
}
export default { addCard, getCardsByScrumboardId, deleteCard }
