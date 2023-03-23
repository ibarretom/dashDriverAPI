import { Router } from 'express'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

import { mostVisitedAddressController } from '../controllers/address/MostVisistedAddress'
import { mostVisitedByMonthAddressController } from '../controllers/address/MostVisitedByMonthAddress'
import { mostVisitedByDayAddressController } from '../controllers/address/MostVisitedByDayAddress'

const AddressRouter = Router()

AddressRouter.get('/mostVisited', EnsureAuthenticated, async (req, res) => {
  await mostVisitedAddressController.handle(req, res)
})

AddressRouter.get(
  '/mostVisitedByMonth',
  EnsureAuthenticated,
  async (req, res) => {
    await mostVisitedByMonthAddressController.handle(req, res)
  }
)

AddressRouter.get(
  '/mostVisitedByDay',
  EnsureAuthenticated,
  async (req, res) => {
    await mostVisitedByDayAddressController.handle(req, res)
  }
)

export { AddressRouter }
