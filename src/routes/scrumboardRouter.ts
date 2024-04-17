import { scrumboardController } from '@/controllers'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()
router.get('/list', scrumboardController.getAllScrumboard)
router.get('/:id/detail', scrumboardController.getScrumboardById)
router.post(
  '/create',
  body('image').isLength({ min: 1 }),
  body('title').isLength({ min: 1 }),
  body('startDate').isLength({ min: 1 }),
  body('type').isIn(['public', 'private']),
  scrumboardController.createScrumboard
)
router.put(
  '/:id/update',
  body('_id').isLength({ min: 1 }),
  body('image').isLength({ min: 1 }),
  body('title').isLength({ min: 1 }),
  body('startDate').isLength({ min: 1 }),
  body('status').isIn(['init', 'complete', 'late', 'pause', 'active']),
  body('type').isIn(['public', 'private']),
  scrumboardController.updateScrumboard
)
router.put(
  '/:id/update-list-order',
  body('listOrderIds').isLength({ min: 2 }),
  scrumboardController.updateScrumboardListOrder
)
router.put(
  '/:id/update-card-order',
  body('listSource').isObject(),
  body('sourceIndex').isInt(),
  body('destinationIndex').isInt(),
  scrumboardController.updateScrumboardCardOrder
)
router.delete('/:id/delete', scrumboardController.deleteScrumboard)
router.post('/:id/add-list', body('title').isLength({ min: 1 }), scrumboardController.addScrumboardList)
router.put('/:id/update-list/:listId', body('title').isLength({ min: 1 }), scrumboardController.updateScrumboardList)
router.delete('/:id/delete-list/:listId', scrumboardController.deleteScrumboardList)

export default router
