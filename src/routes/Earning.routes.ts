import { Router } from 'express'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

import { createEarningController } from '../controllers/earning/CreateEarning'
import { listByMonthEarningController } from '../controllers/earning/ListByMonthEarning'

const EarningRouter = Router()

EarningRouter.post('/', EnsureAuthenticated, async (req, res) => {
  await createEarningController.handle(req, res)
})

EarningRouter.get('/listByMonth', EnsureAuthenticated, async (req, res) => {
  await listByMonthEarningController.handle(req, res)
})

export { EarningRouter }
