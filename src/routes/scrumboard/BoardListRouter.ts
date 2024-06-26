import { boardListController } from '@/controllers'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()
router.get('/', boardListController.getAllList)
router.get('/:id', boardListController.getListById)
router.post('/', body('title').isLength({ min: 1 }), body('scrumboardId').isMongoId(), boardListController.addList)
router.put(
  '/:id',
  body('_id').isMongoId(),
  body('scrumboardId').isMongoId(),
  body('title').isLength({ min: 1 }),
  body('amount').toInt().isInt({ min: 0 }),
  body('cardOrderIds').isArray(),
  boardListController.updateList
)
router.delete('/:id', boardListController.deleteList)

export default router
