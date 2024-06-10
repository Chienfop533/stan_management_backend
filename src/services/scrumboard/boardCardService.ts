import { BoardCardModel } from '@/models'
import { BoardCardType } from '@/types/scrumboardType'

const getAllCard = async () => {
  const boardList = await BoardCardModel.find()
  return boardList
}
const getCardById = async (id: string) => {
  const cardDetail = await BoardCardModel.findById(id)
  return cardDetail
}
const addCard = async (card: BoardCardType) => {
  const newCard = await BoardCardModel.create(card)
  return newCard
}
const updateCard = async (id: string, card: BoardCardType) => {
  const updatedCard = await BoardCardModel.findByIdAndUpdate(id, card, { new: true })
  return updatedCard
}
export default {
  getAllCard,
  getCardById,
  addCard,
  updateCard
}
