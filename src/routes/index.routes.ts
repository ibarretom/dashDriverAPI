import { Router } from 'express'

import { UserRouter } from './Users.routes'
import { AuthRoutes } from './Auth.routes'
import { CarRideRouter } from './CarRide.routes'
import { SpentRouter } from './Spent.routes'
import { EarningRouter } from './Earning.routes'

const router = Router()

router.use('/users', UserRouter)
router.use('/auth', AuthRoutes)
router.use('/carRide', CarRideRouter)
router.use('/spent', SpentRouter)
router.use('/earning', EarningRouter)

export { router }
