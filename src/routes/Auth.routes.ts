import { Router } from 'express'
import { signInController } from '../controllers/auth/signIn'

const AuthRoutes = Router()

AuthRoutes.post('/signin', (req, res) => {
  signInController.handle(req, res)
})

export { AuthRoutes }
