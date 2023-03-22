import { Router } from 'express'

import { UserRouter } from './Users.routes'
import { AuthRoutes } from './Auth.routes'
import { CarRideRouter } from './CarRide.routes'
import { SpentRouter } from './Spent.routes'
import { EarningRouter } from './Earning.routes'
import { KilometerRouter } from './Kilometer.routes'
import { RevenueRouter } from './Revenue.routes'
import { CarInfoRouter } from './CarInfo.routes'

const router = Router()

router.use('/users', UserRouter)
router.use('/auth', AuthRoutes)
router.use('/carRide', CarRideRouter)
router.use('/spent', SpentRouter)
router.use('/earning', EarningRouter)
router.use('/kilometer', KilometerRouter)
router.use('/revenue', RevenueRouter)
router.use('/carInfo', CarInfoRouter)

export { router }
