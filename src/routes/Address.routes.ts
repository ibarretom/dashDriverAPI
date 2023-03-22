import { Router } from 'express'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

import { mostVisitedAddressController } from '../controllers/address/MostVisistedAddress'

const AddressRouter = Router()

AddressRouter.get('/mostVisited', EnsureAuthenticated, async (req, res) => {
  await mostVisitedAddressController.handle(req, res)
})

export { AddressRouter }
