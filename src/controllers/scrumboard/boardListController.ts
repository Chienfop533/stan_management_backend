import { validationResult } from 'express-validator'
import { Request, Response } from 'express'
import { boardListService } from '@/services'
import mongoose from 'mongoose'
import { BoardListType } from '@/types/scrumboardType'

const getAllList = async (req: Request, res: Response) => {
  try {
    const boardList = await boardListService.getAllList()
    res.status(200).json({ success: true, message: 'Get all list successfully', data: boardList })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const getListById = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(listId)) {
      return res.status(400).json({ success: false, message: 'ListId not format ObjectId' })
    }
    const listDetail = await boardListService.getListById(listId)
    res.status(200).json({ success: true, message: 'Get list detail successfully', data: listDetail })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const addList = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const listReq = req.body as BoardListType
    const list = await boardListService.addList(listReq)
    res.status(201).json({ success: true, message: 'Add new list successfully', data: list })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const updateList = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const listReq = req.body as BoardListType
    const listId = req.params.id
    const list = await boardListService.updateList(listId, listReq)
    if (list) {
      res.status(200).json({ success: true, message: 'Update list successfully', data: list })
    } else {
      res.status(400).json({ success: false, message: 'ListId not match' })
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
const deleteList = async (req: Request, res: Response) => {
  try {
    const listId = req.params.id
    const list = await boardListService.deleteList(listId)
    if (list) {
      res.status(200).json({ success: true, message: 'Delete list successfully', data: list })
    } else {
      res.status(400).json({ success: false, message: 'ListId not match' })
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.toString() })
  }
}
// const getCardsByScrumboardId = async (req: Request, res: Response) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }
//     const scrumboardId = req.params.scrumboardId
//     const listCard = await boardListService.getCardsByScrumboardId(scrumboardId)
//     res.status(200).json({ success: true, message: 'Get list card by scrumboard successfully', data: listCard })
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.toString() })
//   }
// }
// const addCard = async (req: Request, res: Response) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//   try {
//     const cardReq = req.body
//     const scrumboardId = req.params.scrumboardId
//     const card = await boardListService.addCard(scrumboardId, cardReq)
//     res.status(201).json({ success: true, message: 'Add new card successfully', data: card })
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.toString() })
//   }
// }
// const deleteCard = async (req: Request, res: Response) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//   try {
//     const cardId = req.params.cardId
//     const card = await boardListService.deleteCard(cardId)
//     res.status(200).json({ success: true, message: 'Delete card successfully', data: card })
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.toString() })
//   }
// }
export default { getAllList, getListById, addList, updateList, deleteList }
