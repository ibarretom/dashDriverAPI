import { Router } from 'express'

import { createSpentController } from '../controllers/spent/spent/CreateSpent'
import { listByMonthSpentController } from '../controllers/spent/spent/ListByMonthSpent'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const SpentRouter = Router()

SpentRouter.post('/', EnsureAuthenticated, async (req, res) => {
  await createSpentController.handle(req, res)
})

SpentRouter.get('/getByMonth', EnsureAuthenticated, async (req, res) => {
  await listByMonthSpentController.handle(req, res)
})

export { SpentRouter }
