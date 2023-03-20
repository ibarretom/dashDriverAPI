import { Router } from 'express'
import { createKilometerController } from '../controllers/kilometer/CreateKilometer'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const KilometerRouter = Router()

KilometerRouter.post('/', EnsureAuthenticated, async (req, res) => {
  await createKilometerController.handle(req, res)
})

export { KilometerRouter }
