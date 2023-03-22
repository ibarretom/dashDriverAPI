import { Router } from 'express'
import { getRevenueController } from '../controllers/revenue/GetRevenue'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const RevenueRouter = Router()

RevenueRouter.get('/', EnsureAuthenticated, async (req, res) => {
  await getRevenueController.handle(req, res)
})

export { RevenueRouter }
