import { FuelRepository } from '../../../../repositories/spent/fuel/Fuel.repository'
import { ListByMonthFuelService } from '../../../../service/spent/Fuel/ListByMonthFuel.service'
import { ListByMonthFuelController } from './ListByMonthFuel.controller'

const fuelRepository = new FuelRepository()

const listByMonthFuelService = new ListByMonthFuelService(fuelRepository)

const listByMonthFuelController = new ListByMonthFuelController(
  listByMonthFuelService
)

export { listByMonthFuelController }
