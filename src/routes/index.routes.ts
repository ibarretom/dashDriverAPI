import { Router } from 'express'

import { UserRouter } from './Users.routes'
import { AuthRoutes } from './Auth.routes'
import { CarRideRouter } from './CarRide.routes'

const router = Router()

router.use('/users', UserRouter)
router.use('/auth', AuthRoutes)
router.use('/carRide', CarRideRouter)

export { router }
