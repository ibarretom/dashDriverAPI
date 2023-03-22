import { Router } from 'express'
import { getCarInfoController } from '../controllers/carInfo/GetCarInfo'
import { EnsureAuthenticated } from '../middleware/EnsureAuthenticated'

const CarInfoRouter = Router()

CarInfoRouter.get('/', EnsureAuthenticated, async (req, res) => {
  await getCarInfoController.handle(req, res)
})

export { CarInfoRouter }
