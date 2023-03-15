import { Router } from 'express'

import { carRideController } from '../controllers/carRide/CreateCarRide'
import { listByDayCarRideController } from '../controllers/carRide/ListByDayCarRide'
import { listByMonthCarRideController } from '../controllers/carRide/ListByMontCarRide'

import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const CarRideRouter = Router()

CarRideRouter.post('/', EnsureAuthenticated, async (req, res) => {
  await carRideController.handle(req, res)
})

CarRideRouter.get('/getByMonth', EnsureAuthenticated, async (req, res) => {
  await listByMonthCarRideController.handle(req, res)
})

CarRideRouter.get('/getByDay', EnsureAuthenticated, async (req, res) => {
  await listByDayCarRideController.handle(req, res)
})

export { CarRideRouter }
