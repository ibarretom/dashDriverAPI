import { KilometerRepository } from '../../../repositories/kilometer/Kilometer.repository'
import { CreateKilometerService } from '../../../service/kilometer/CreateKilometer.service'
import { CreateKilometerController } from './CreateKilometer.controller'

const kilometerRepository = new KilometerRepository()

const createKilometerService = new CreateKilometerService(kilometerRepository)

const createKilometerController = new CreateKilometerController(
  createKilometerService
)

export { createKilometerController }
