import { boardCardController } from '@/controllers'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()
router.get('/', boardCardController.getAllCard)
router.get('/:id', boardCardController.getCardById)
router.post(
  '/',
  body('title').isLength({ min: 4 }),
  body('scrumboardId').isMongoId(),
  body('listId').isMongoId(),
  boardCardController.addCard
)
router.put(
  '/:id',
  body('_id').isMongoId(),
  body('scrumboardId').isMongoId(),
  body('listId').isMongoId(),
  body('title').isLength({ min: 4 }),
  body('memberIds').isArray(),
  body('labels').isArray(),
  body('attachments').isArray(),
  body('todo').isArray(),
  body('comments').isArray(),
  boardCardController.updateCard
)
router.delete('/:id', boardCardController.deleteCard)
export default router
