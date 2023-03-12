import { Router } from 'express'

import { createUsersController } from '../controllers/user/CreateUsers/'

const UserRouter = Router()

UserRouter.post('/', async (req, res) => {
  await createUsersController.handle(req, res)
})

export { UserRouter }
