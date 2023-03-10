import { Router } from 'express'

import { UserRouter } from './Users.routes'

const router = Router()

router.use('/users', UserRouter)

export { router }
