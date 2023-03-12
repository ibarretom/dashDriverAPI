import { Router } from 'express'
import { signInController } from '../controllers/auth/signIn'

const AuthRoutes = Router()

AuthRoutes.post('/signin', async (req, res) => {
  await signInController.handle(req, res)
})

export { AuthRoutes }
