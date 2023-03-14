import { UsersRepository } from '../../../repositories/user/Users.repository'
import { CreateUsersService } from '../../../service/users/CreateUsers.service'
import { CreateUsersController } from './CreateUsers.controller'

const usersRepository = new UsersRepository()

const createUsersService = new CreateUsersService(usersRepository)

const createUsersController = new CreateUsersController(createUsersService)

export { createUsersController }
