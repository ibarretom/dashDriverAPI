import { Router } from 'express'

import { createUsersController } from '../controllers/user/CreateUsers/'

const UserRouter = Router()

UserRouter.post('/', (req, res) => {
  createUsersController.handle(req, res)
})

export { UserRouter }
