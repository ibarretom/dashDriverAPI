import { CarRideRepository } from '../../../repositories/carRide/CarRide.repository'
import { MostVisitedAddressService } from '../../../service/address/MostVisitedAddress.service'
import { MostVisitedAddressController } from './MostVisitedAddress.controller'

const carRideRepository = new CarRideRepository()

const mostVisitedAddressService = new MostVisitedAddressService(
  carRideRepository
)

const mostVisitedAddressController = new MostVisitedAddressController(
  mostVisitedAddressService
)

export { mostVisitedAddressController }
