import { CarRideRepository } from '../../../repositories/carRide/CarRide.repository'

import { MostVisitedByMonthAddressService } from '../../../service/address/MostVisitedByMonthAddress.service'
import { MostVisitedByMonthAddressController } from './MostVisitedByMonthAddress.controller'

const carRideRepository = new CarRideRepository()

const mostVisitedByMonthService = new MostVisitedByMonthAddressService(
  carRideRepository
)

const mostVisitedByMonthAddressController =
  new MostVisitedByMonthAddressController(mostVisitedByMonthService)

export { mostVisitedByMonthAddressController }
