import { Router } from 'express'
import { CreateUserController } from '../controllers/user/CreateUserController'

const UserRouter = Router()

UserRouter.post('/', new CreateUserController().handle)

export { UserRouter }
