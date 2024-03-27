import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { scrumboardService } from '@/services'
const createNewScrumboard = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const scrumboard = await scrumboardService.createNewScrumboard(req.body)
    res.status(201).json({ success: true, message: 'Create new scrumboard successfully', data: scrumboard })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
export default { createNewScrumboard }
