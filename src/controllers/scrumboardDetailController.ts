import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { scrumboardDetailService } from '@/services'

const getCardsByScrumboardId = async (req: Request, res: Response) => {
  try {
    const scrumboardId = req.params.scrumboardId
    const listCard = await scrumboardDetailService.getCardsByScrumboardId(scrumboardId)
    res.status(200).json({ success: true, message: 'Get list card by scrumboard successfully', data: listCard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const addCard = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const cardReq = req.body
    const scrumboardId = req.params.scrumboardId
    const card = await scrumboardDetailService.addCard(scrumboardId, cardReq)
    res.status(201).json({ success: true, message: 'Add new card successfully', data: card })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
export default { addCard, getCardsByScrumboardId }
