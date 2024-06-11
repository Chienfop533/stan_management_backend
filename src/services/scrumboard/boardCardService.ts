import { BoardCardModel, BoardListModel } from '@/models'
import { BoardCardType } from '@/types/scrumboardType'

const getAllCard = async () => {
  const boardList = await BoardCardModel.find()
  return boardList
}
const getCardById = async (id: string) => {
  const cardDetail = await BoardCardModel.findById(id)
  return cardDetail
}
const getCardsByScrumboardId = async (scrumboardId: string) => {
  const boardCards = await BoardCardModel.find({ scrumboardId: scrumboardId })
  return boardCards
}
const addCard = async (card: BoardCardType) => {
  const newCard = await BoardCardModel.create(card)
  await BoardListModel.findByIdAndUpdate(card.listId, {
    $push: {
      cardOrderIds: newCard._id
    }
  })
  return newCard
}
const updateCard = async (id: string, card: BoardCardType) => {
  const updatedCard = await BoardCardModel.findByIdAndUpdate(id, card, { new: true })
  return updatedCard
}

const deleteCard = async (id: string) => {
  const card = await BoardCardModel.findByIdAndDelete(id)
  await BoardListModel.findByIdAndUpdate(card?.listId, {
    $pull: { cardOrderIds: id }
  })
  return card
}

export default {
  getAllCard,
  getCardById,
  addCard,
  updateCard,
  deleteCard,
  getCardsByScrumboardId
}
