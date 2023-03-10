import { Request, Response } from 'express'

export class CreateUserController {
  handle(request: Request, response: Response): Response {
    const { name, email, password } = request.body

    return response.status(201).json({ name, email, password })
  }
}
