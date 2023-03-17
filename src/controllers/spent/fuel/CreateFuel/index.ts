import { FuelRepository } from '../../../../repositories/spent/fuel/Fuel.repository'
import { CreateFuelService } from '../../../../service/spent/Fuel/CreateFuel.service'
import { CreateFuelController } from './CreateFuel.controller'

const fuelRepository = new FuelRepository()

const createFuelService = new CreateFuelService(fuelRepository)

const createFuelController = new CreateFuelController(createFuelService)

export { createFuelController }
