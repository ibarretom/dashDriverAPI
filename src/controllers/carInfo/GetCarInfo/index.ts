import { KilometerRepository } from '../../../repositories/kilometer/Kilometer.repository'
import { FuelRepository } from '../../../repositories/spent/fuel/Fuel.repository'
import { GetCarInfoService } from '../../../service/carInfo/GetCarInfo.service'
import { GetCarInfoController } from './GetCarInfo.controller'

const fuelRepository = new FuelRepository()
const kilometerRepository = new KilometerRepository()

const getCarInfoService = new GetCarInfoService(
  fuelRepository,
  kilometerRepository
)

const getCarInfoController = new GetCarInfoController(getCarInfoService)

export { getCarInfoController }
