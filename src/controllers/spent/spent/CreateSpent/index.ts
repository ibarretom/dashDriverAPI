import { SpentRepository } from '../../../../repositories/spent/spent/Spent.repository'
import { CreateSpentService } from '../../../../service/spent/spent/CreateSpent.service'
import { CreateSpentController } from './CreateSpent.controller'

const spentRepository = new SpentRepository()

const createSpentService = new CreateSpentService(spentRepository)

const createSpentController = new CreateSpentController(createSpentService)

export { createSpentController }
