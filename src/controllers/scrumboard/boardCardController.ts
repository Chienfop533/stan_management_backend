import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { BoardCardType } from '@/types/scrumboardType'
import boardCardService from '@/services/scrumboard/boardCardService'

const getAllCard = async (req: Request, res: Response) => {
  try {
    const boardList = await boardCardService.getAllCard()
    res.status(200).json({ success: true, message: 'Get all card successfully', data: boardList })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const getCardById = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ success: false, message: 'CardId not format ObjectId' })
    }
    const cardDetail = await boardCardService.getCardById(cardId)
    res.status(200).json({ success: true, message: 'Get card detail successfully', data: cardDetail })
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
    const cardReq = req.body as BoardCardType
    const card = await boardCardService.addCard(cardReq)
    res.status(201).json({ success: true, message: 'Add new card successfully', data: card })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const updateCard = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const cardReq = req.body as BoardCardType
    const cardId = req.params.id
    const card = await boardCardService.updateCard(cardId, cardReq)
    if (card) {
      res.status(200).json({ success: true, message: 'Update card successfully', data: card })
    } else {
      res.status(400).json({ success: false, message: 'CardId not match' })
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const deleteCard = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id
    const card = await boardCardService.deleteCard(cardId)
    if (card) {
      res.status(200).json({ success: true, message: 'Delete card successfully', data: card })
    } else {
      res.status(400).json({ success: false, message: 'CardId not match' })
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}

export default { addCard, getAllCard, getCardById, updateCard, deleteCard }
