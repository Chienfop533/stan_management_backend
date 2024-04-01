import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { scrumboardService } from '@/services'
import { ScrumboardTypeReq } from '@/types/scrumboardType'
import moment from 'moment'
import { checkStatusByDate } from '@/utils/checkStatus'
import { error } from 'console'
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
    res.status(201).json({ success: true, message: 'Create new scrumboard successfully', data: scrumboard })
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
export default { createScrumboard, deleteScrumboard, updateScrumboard }
