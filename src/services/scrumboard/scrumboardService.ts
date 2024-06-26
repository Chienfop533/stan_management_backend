import { BoardCardModel, BoardListModel, ScrumboardModel } from '@/models'
import { ScrumboardType } from '@/types/scrumboardType'
import mongoose from 'mongoose'

const getAllScrumboard = async () => {
  const listScrumboard = await ScrumboardModel.find()
  return listScrumboard
}
const getScrumboardById = async (id: string) => {
  const scrumboardId = new mongoose.Types.ObjectId(id)
  const scrumboardDetail = await ScrumboardModel.aggregate([
    {
      $match: {
        _id: scrumboardId
      }
    },
    {
      $lookup: {
        from: 'boardlists',
        localField: '_id',
        foreignField: 'scrumboardId',
        as: 'lists',
        pipeline: [
          {
            $lookup: {
              from: 'boardcards',
              localField: '_id',
              foreignField: 'listId',
              as: 'cards'
            }
          }
        ]
      }
    }
  ])
  return scrumboardDetail[0] ?? null
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
  await BoardListModel.deleteMany({ scrumboardId: id })
  await BoardCardModel.deleteMany({ scrumboardId: id })
  return scrumboard
}

const updateScrumboardListOrder = async (scrumboardId: string, scrumboardList: { listOrderIds: string[] }) => {
  const updatedScrumboardList = await ScrumboardModel.findByIdAndUpdate(
    scrumboardId,
    { $set: { listOrderIds: scrumboardList.listOrderIds } },
    { new: true }
  )
  return updatedScrumboardList
}
const updateCardOrderInList = async (listId: string, orderedCard: string[]) => {
  const updatedList = await BoardListModel.findByIdAndUpdate(listId, { $set: { cardOrderIds: orderedCard } })
  return updatedList
}
const updateCardOrderDifferentList = async (
  sourceId: string,
  sourceCardOrder: string[],
  destinationId: string,
  destinationOrder: string[],
  cardId: string
) => {
  await BoardListModel.findByIdAndUpdate(sourceId, { $set: { cardOrderIds: sourceCardOrder } })
  await BoardListModel.findByIdAndUpdate(destinationId, {
    $set: { cardOrderIds: destinationOrder }
  })

  const updatedCard = await BoardCardModel.findByIdAndUpdate(cardId, { $set: { listId: destinationId } })
  return updatedCard
}

export default {
  createScrumboard,
  updateScrumboard,
  getAllScrumboard,
  getScrumboardFilter,
  getScrumboardById,
  deleteScrumboard,
  updateScrumboardListOrder,
  updateCardOrderInList,
  updateCardOrderDifferentList
}
