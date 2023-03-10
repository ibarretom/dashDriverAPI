import { Request, Response } from 'express'
import { z } from 'zod'

export class CreateUserController {
  handle(request: Request, response: Response): Response {
    const requestSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    try {
      const { name, email, password } = requestSchema.parse(request.body)

      return response.status(201).json({ name, email, password })
    } catch (err) {
      return response.status(400).json(err)
    }
  }
}
