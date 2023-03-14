import { Router } from 'express'
import { carRideController } from '../controllers/carRide/'

const CarRideRouter = Router()

CarRideRouter.post('/', async (req, res) => {
  await carRideController.handle(req, res)
})

export { CarRideRouter }
