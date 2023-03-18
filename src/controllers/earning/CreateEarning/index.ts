import { EarningRepository } from '../../../repositories/earning/Earning.repository'
import { CreateEarningService } from '../../../service/earning/CreateEarning.service'
import { CreateEarningController } from './CreateEarning.controller'

const earningRepository = new EarningRepository()

const createEarningService = new CreateEarningService(earningRepository)

const createEarningController = new CreateEarningController(
  createEarningService
)

export { createEarningController }
