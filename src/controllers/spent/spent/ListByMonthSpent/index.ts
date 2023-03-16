import { SpentRepository } from '../../../../repositories/spent/spent/Spent.repository'
import { ListByMonthSpentService } from '../../../../service/spent/spent/ListByMothSpent.service'
import { ListByMonthSpentController } from './ListByMonthSpent.controller'

const spentRepository = new SpentRepository()

const listByMonthSpentService = new ListByMonthSpentService(spentRepository)

const listByMonthSpentController = new ListByMonthSpentController(
  listByMonthSpentService
)

export { listByMonthSpentController }
