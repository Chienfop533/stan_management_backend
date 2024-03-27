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
  scrumboardController.createNewScrumboard
)
export default router
