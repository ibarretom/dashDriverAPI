import { Router } from 'express'
import { createSpentController } from '../controllers/spent/spent/CreateSpent'
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const SpentRouter = Router()

SpentRouter.post('/', EnsureAuthenticated, async (req, res) => {
  await createSpentController.handle(req, res)
})

export { SpentRouter }
