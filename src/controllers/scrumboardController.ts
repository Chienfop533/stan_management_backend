import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { scrumboardService } from '@/services'
import { ScrumboardTypeReq } from '@/types/scrumboardType'
import { attachStatusCheckCookies, checkStatusByDate } from '@/utils/checkStatus'
import moment from 'moment'

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
    res.status(201).json({ success: true, message: 'Get all scrumboard successfully', data: listScrumboard })
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
const createScrumboard = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboardReq = req.body as ScrumboardTypeReq
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
    const scrumboardReq = req.body as ScrumboardTypeReq
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
const addScrumboardList = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboardReq = req.body
    const scrumboardId = req.params.id
    const scrumboard = await scrumboardService.addScrumboardList(scrumboardId, scrumboardReq)
    res.status(201).json({ success: true, message: 'Create new scrumboard list successfully', data: scrumboard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const updateScrumboardList = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboardReq = req.body
    const scrumboardId = req.params.id
    const listId = req.params.listId
    const scrumboard = await scrumboardService.updateScrumboardList(scrumboardId, listId, scrumboardReq)
    res.status(200).json({ success: true, message: 'Update scrumboard list successfully', data: scrumboard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const deleteScrumboardList = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboardId = req.params.id
    const listId = req.params.listId
    const scrumboard = await scrumboardService.deleteScrumboardList(scrumboardId, listId)
    res.status(200).json({ success: true, message: 'Delete scrumboard list successfully', data: scrumboard })
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
    const scrumboard = await scrumboardService.updateScrumboardListOrder(scrumboardId, scrumboardReq)
    res.status(200).json({ success: true, message: 'Update list order successfully', data: scrumboard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}

export default {
  createScrumboard,
  deleteScrumboard,
  updateScrumboard,
  getAllScrumboard,
  addScrumboardList,
  updateScrumboardList,
  deleteScrumboardList,
  updateScrumboardListOrder
}
