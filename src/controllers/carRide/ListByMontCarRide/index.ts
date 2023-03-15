import { CarRideRepository } from '../../../repositories/carRide/CarRide.respository'

import { ListByMonthCarRideService } from '../../../service/carRide/ListByMonthCarRide.service'
import { ListByMonthCarRideController } from './ListByMonthCarRide.controller'

const carRideRepository = new CarRideRepository()

const carRideService = new ListByMonthCarRideService(carRideRepository)

const listByMonthCarRideController = new ListByMonthCarRideController(
  carRideService
)

export { listByMonthCarRideController }
