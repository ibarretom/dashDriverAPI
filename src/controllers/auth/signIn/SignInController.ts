import { Request, Response } from 'express'
import { z } from 'zod'
import { AppError } from '../../../errors/AppError'
import { SignInService } from '../../../service/auth/SignIn.service'

export class SignInController {
  constructor(private signInService: SignInService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const signInSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = signInSchema.parse(request.body)

    const user = await this.signInService.execute({ email, password })

    return response.status(200).json(user)
  }
}
