import { UsersRepository } from '../../../repositories/user/Users.repository'
import { SignInService } from '../../../service/auth/SignIn.service'
import { SignInController } from './SignInController'

const usersRepository = new UsersRepository()

const signInService = new SignInService(usersRepository)

const signInController = new SignInController(signInService)

export { signInController }
