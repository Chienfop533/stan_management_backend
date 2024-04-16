import { scrumboardDetailController } from '@/controllers'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()
router.get('/:scrumboardId/list-card', scrumboardDetailController.getCardsByScrumboardId)
router.post(
  '/:scrumboardId/add-card',
  body('title').isLength({ min: 1 }),
  body('listId').isLength({ min: 10 }),
  scrumboardDetailController.addCard
)
router.delete('/delete-card/:cardId', scrumboardDetailController.deleteCard)

export default router
