import { CarRideRepository } from '../../../repositories/carRide/CarRide.repository'
import { ListByDayCarRideService } from '../../../service/carRide/ListByDayCarRide.service'
import { ListByDayCarRideController } from './ListByDay.controller'

const carRideRepository = new CarRideRepository()

const listByDayCarRide = new ListByDayCarRideService(carRideRepository)

const listByDayCarRideController = new ListByDayCarRideController(
  listByDayCarRide
)

export { listByDayCarRideController }
