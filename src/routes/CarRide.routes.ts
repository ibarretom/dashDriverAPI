import { Router } from 'express'

import { carRideController } from '../controllers/carRide/CreateCarRide'
import { listByMonthCarRideController } from '../controllers/carRide/ListByMontCarRide'

const CarRideRouter = Router()

CarRideRouter.post('/', async (req, res) => {
  await carRideController.handle(req, res)
})

CarRideRouter.get('/getByMonth', async (req, res) => {
  await listByMonthCarRideController.handle(req, res)
})

export { CarRideRouter }
