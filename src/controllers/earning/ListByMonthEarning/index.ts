import { EarningRepository } from '../../../repositories/earning/Earning.repository'
import { ListByMonthEarningService } from '../../../service/earning/ListByMonthEarning.service'
import { ListByMonthEarningController } from './ListByMonthEarning.controller'

const earningRepository = new EarningRepository()

const listByMonthEarningService = new ListByMonthEarningService(
  earningRepository
)

const listByMonthEarningController = new ListByMonthEarningController(
  listByMonthEarningService
)

export { listByMonthEarningController }
