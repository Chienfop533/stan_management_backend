import { scrumboardController } from '@/controllers'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()
router.get('/', scrumboardController.getAllScrumboard)
router.get('/:id', scrumboardController.getScrumboardById)
router.post(
  '/',
  body('image').notEmpty(),
  body('title').isLength({ min: 4 }),
  body('startDate').isISO8601().toDate(),
  body('type').isIn(['public', 'private']),
  scrumboardController.createScrumboard
)
router.put(
  '/:id',
  body('_id').isMongoId(),
  body('image').notEmpty(),
  body('title').isLength({ min: 4 }),
  body('startDate').isISO8601().toDate(),
  body('status').isIn(['init', 'complete', 'late', 'pause', 'active']),
  body('type').isIn(['public', 'private']),
  body('listOrderIds').isArray(),
  scrumboardController.updateScrumboard
)
router.delete('/:id', scrumboardController.deleteScrumboard)

router.put(
  '/:id/update-list-order',
  body('listOrderIds').isLength({ min: 2 }),
  scrumboardController.updateScrumboardListOrder
)

router.put(
  '/:id/update-card-order',
  body('listSourceId').isMongoId(),
  body('sourceIndex').isInt(),
  body('destinationIndex').isInt(),
  scrumboardController.updateScrumboardCardOrder
)

export default router
