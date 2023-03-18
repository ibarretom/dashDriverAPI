import { Router } from 'express'
import { createEarningController } from '../controllers/earning/CreateEarning'
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const EarningRouter = Router()

EarningRouter.post('/', EnsureAuthenticated, async (req, res) => {
  await createEarningController.handle(req, res)
})

export { EarningRouter }
