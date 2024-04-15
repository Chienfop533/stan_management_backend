import { ScrumboardDetailModel } from '@/models'

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
  return newCard
}
export default { addCard, getCardsByScrumboardId }
