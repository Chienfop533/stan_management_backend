import scrumboardController from '@/controllers/scrumboardController'
import express from 'express'
import { body } from 'express-validator'

const router = express.Router()
router.post(
  '/create',
  body('image').isLength({ min: 1 }),
  body('title').isLength({ min: 1 }),
  body('startDate').isLength({ min: 1 }),
  body('type').isIn(['public', 'private']),
  scrumboardController.createScrumboard
)
router.post(
  '/update/:id',
  body('id').isLength({ min: 1 }),
  body('image').isLength({ min: 1 }),
  body('title').isLength({ min: 1 }),
  body('startDate').isLength({ min: 1 }),
  body('status').isIn(['init', 'complete', 'late', 'pause', 'active']),
  body('type').isIn(['public', 'private']),
  scrumboardController.updateScrumboard
)
router.post('/delete/:id', scrumboardController.deleteScrumboard)
export default router
