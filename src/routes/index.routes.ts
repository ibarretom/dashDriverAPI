import { Router } from 'express'

import { UserRouter } from './Users.routes'
import { AuthRoutes } from './Auth.routes'

const router = Router()

router.use('/users', UserRouter)
router.use('/auth', AuthRoutes)

export { router }
