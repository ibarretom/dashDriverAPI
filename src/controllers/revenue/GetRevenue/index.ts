import { CarRideRepository } from '../../../repositories/carRide/CarRide.repository'
import { EarningRepository } from '../../../repositories/earning/Earning.repository'
import { FuelRepository } from '../../../repositories/spent/fuel/Fuel.repository'
import { SpentRepository } from '../../../repositories/spent/spent/Spent.repository'
import { GetRevenueService } from '../../../service/revenue/GetRevenue.service'
import { GetRevenueController } from './GetRevenue.controller'

const carRidesRepository = new CarRideRepository()

const earningsRepository = new EarningRepository()

const spentRepository = new SpentRepository()

const fuelRepository = new FuelRepository()

const getRevenueService = new GetRevenueService(
  carRidesRepository,
  earningsRepository,
  spentRepository,
  fuelRepository
)

const getRevenueController = new GetRevenueController(getRevenueService)

export { getRevenueController }
