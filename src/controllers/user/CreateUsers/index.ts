import { UsersRepository } from '../../../repositories/user/UsersRepository'
import { CreateUsersService } from '../../../service/users/CreateUsers.service'
import { CreateUsersController } from './CreateUsersController'

const usersRepository = new UsersRepository()

const createUsersService = new CreateUsersService(usersRepository)

const createUsersController = new CreateUsersController(createUsersService)

export { createUsersController }
