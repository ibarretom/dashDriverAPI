import { Router } from 'express'

import { createFuelController } from '../controllers/spent/fuel/CreateFuel'
import { createSpentController } from '../controllers/spent/spent/CreateSpent'
import { listByMonthSpentController } from '../controllers/spent/spent/ListByMonthSpent'
import { listByMonthFuelController } from '../controllers/spent/fuel/ListByMonthFuel'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const SpentRouter = Router()

SpentRouter.post('/', EnsureAuthenticated, async (req, res) => {
  await createSpentController.handle(req, res)
})

SpentRouter.get('/getByMonth', EnsureAuthenticated, async (req, res) => {
  await listByMonthSpentController.handle(req, res)
})

SpentRouter.post('/fuel', EnsureAuthenticated, async (req, res) => {
  await createFuelController.handle(req, res)
})

SpentRouter.get('/fuel/getByMonth', EnsureAuthenticated, async (req, res) => {
  await listByMonthFuelController.handle(req, res)
})

export { SpentRouter }
