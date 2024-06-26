import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { boardListService, scrumboardService } from '@/services'
import { OrderedCardType, ScrumboardType } from '@/types/scrumboardType'
import { attachStatusCheckCookies, checkStatusByDate } from '@/utils/checkStatus'
import moment from 'moment'
import mongoose from 'mongoose'

const getAllScrumboard = async (req: Request, res: Response) => {
  try {
    const listUpdated = await updateStatusScrumboards(req, res)
    if (listUpdated && listUpdated.length > 0) {
      listUpdated.map(async (item: any) => {
        await scrumboardService.updateScrumboard(item._id.toString(), item)
      })
    }
    attachStatusCheckCookies({ res, isCheckedDate: true })
    const listScrumboard = await scrumboardService.getAllScrumboard()
    res.status(200).json({ success: true, message: 'Get all scrumboard successfully', data: listScrumboard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const updateStatusScrumboards = async (req: Request, res: Response) => {
  const isCheckedDate = req.signedCookies['is_checked_date']
  if (!isCheckedDate) {
    const filter = { status: { $in: ['init', 'active'] } }
    const listFilter = await scrumboardService.getScrumboardFilter(filter)
    const listFilterToUpdate = listFilter.filter((item) => {
      const startDate = moment(item.startDate).startOf('day')
      const dueDate = item.dueDate ? moment(item.dueDate).startOf('day') : null
      const currentDate = moment().startOf('day')
      if (item.status == 'init' && startDate.isSameOrAfter(currentDate)) {
        item.status = 'active'
        return item
      } else if (item.status == 'active' && dueDate && dueDate.isBefore(currentDate)) {
        item.status = 'late'
        return item
      }
    })
    return listFilterToUpdate
  } else {
    return []
  }
}
const getScrumboardById = async (req: Request, res: Response) => {
  try {
    const scrumboardId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(scrumboardId)) {
      return res.status(400).json({ success: false, message: 'ScrumboardId not format ObjectId' })
    }
    const scrumboardDetail: any = await scrumboardService.getScrumboardById(scrumboardId)

    res.status(200).json({ success: true, message: 'Get scrumboard detail successfully', data: scrumboardDetail })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const createScrumboard = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboardReq = req.body as ScrumboardType
    scrumboardReq.status = checkStatusByDate(scrumboardReq.startDate, scrumboardReq.dueDate)
    const scrumboard = await scrumboardService.createScrumboard(scrumboardReq)
    res.status(201).json({ success: true, message: 'Create new scrumboard successfully', data: scrumboard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const updateScrumboard = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboardReq = req.body as ScrumboardType
    const scrumboardId = req.params.id
    if (scrumboardReq.status != 'complete' && scrumboardReq.status != 'pause') {
      scrumboardReq.status = checkStatusByDate(scrumboardReq.startDate, scrumboardReq.dueDate)
    }
    const scrumboard = await scrumboardService.updateScrumboard(scrumboardId, scrumboardReq)
    if (scrumboard) {
      res.status(200).json({ success: true, message: 'Update scrumboard successfully', data: scrumboard })
    } else {
      res.status(400).json({ success: false, message: 'ScrumboardId not match' })
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const deleteScrumboard = async (req: Request, res: Response) => {
  try {
    const scrumboardId = req.params.id
    const scrumboard = await scrumboardService.deleteScrumboard(scrumboardId)
    if (scrumboard) {
      res.status(200).json({ success: true, message: 'Delete scrumboard successfully', data: scrumboard })
    } else {
      res.status(400).json({ success: false, message: 'ScrumboardId not match' })
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}

const updateScrumboardListOrder = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboardReq = req.body
    const scrumboardId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(scrumboardId)) {
      return res.status(400).json({ success: false, message: 'ScrumboardId not format ObjectId' })
    }
    const scrumboard = await scrumboardService.updateScrumboardListOrder(scrumboardId, scrumboardReq)
    res.status(200).json({ success: true, message: 'Update list order successfully', data: scrumboard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const updateScrumboardCardOrder = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const orderedCard = req.body as OrderedCardType
    const scrumboardId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(scrumboardId)) {
      return res.status(400).json({ success: false, message: 'ScrumboardId not format ObjectId' })
    }

    if (orderedCard.listDestinationId) {
      //Order different list
      const sourceList = await boardListService.getListById(orderedCard.listSourceId)
      const destinationList = await boardListService.getListById(orderedCard.listDestinationId)
      let reOrderedSource: string[] = sourceList?.cardOrderIds.map((item) => item.toString()) ?? []
      const [cardId] = reOrderedSource.splice(orderedCard.sourceIndex, 1)
      reOrderedSource = reOrderedSource.filter((item) => item != cardId)
      const reOrderedDestination: string[] = destinationList?.cardOrderIds.map((item) => item.toString()) ?? []
      reOrderedDestination.splice(orderedCard.destinationIndex, 0, cardId)

      if (cardId) {
        const response = await scrumboardService.updateCardOrderDifferentList(
          sourceList?._id.toString() as string,
          reOrderedSource,
          destinationList?._id.toString() as string,
          reOrderedDestination,
          cardId
        )
        res.status(200).json({ success: true, message: 'Update card order successfully', data: response })
      } else {
        res.status(400).json({ success: false, message: 'SourceIndex is not correct' })
      }
    } else {
      //Order in list
      const list = await boardListService.getListById(orderedCard.listSourceId)
      const reOrderedCardIds: string[] = list?.cardOrderIds.map((item) => item.toString()) ?? []
      const [removedCardId] = reOrderedCardIds.splice(orderedCard.sourceIndex, 1)
      reOrderedCardIds.splice(orderedCard.destinationIndex, 0, removedCardId)

      const response = await scrumboardService.updateCardOrderInList(list?._id.toString() as string, reOrderedCardIds)
      res.status(200).json({ success: true, message: 'Update card order successfully', data: response })
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}

export default {
  createScrumboard,
  updateScrumboard,
  getAllScrumboard,
  getScrumboardById,
  deleteScrumboard,
  updateScrumboardListOrder,
  updateScrumboardCardOrder
}
