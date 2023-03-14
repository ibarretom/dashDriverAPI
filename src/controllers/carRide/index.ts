import { AddressRepository } from '../../repositories/address/Address.repository'
import { CarRideRepository } from '../../repositories/carRide/CarRide.respository'
import { CreateCarRideService } from '../../service/carRide/CreateCarRide.service'

import { CarRideController } from './CreateCarRide.controller'

const addressRepository = new AddressRepository()
const carRideRepository = new CarRideRepository()

const carRideService = new CreateCarRideService(
  carRideRepository,
  addressRepository
)

const carRideController = new CarRideController(carRideService)

export { carRideController }
