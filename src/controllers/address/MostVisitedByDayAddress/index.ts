import { CarRideRepository } from '../../../repositories/carRide/CarRide.repository'
import { MostVisitedByDayAddressService } from '../../../service/address/MostVisitedByDayAddress.service'
import { MostVisitedByDayAddressController } from './MostVisitedByDayAddress.controller'

const carRideRepository = new CarRideRepository()

const mostVisitedByDayAddressService = new MostVisitedByDayAddressService(
  carRideRepository
)

const mostVisitedByDayAddressController = new MostVisitedByDayAddressController(
  mostVisitedByDayAddressService
)

export { mostVisitedByDayAddressController }
