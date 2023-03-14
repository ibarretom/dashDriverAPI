import { Request, Response } from 'express'
import { z } from 'zod'

import { CreateUsersService } from '../../../service/users/CreateUsers.service'

export class CreateUsersController {
  createUsersService: CreateUsersService

  constructor(createUsersService: CreateUsersService) {
    this.createUsersService = createUsersService
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const requestSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const { name, email, password } = requestSchema.parse(request.body)

    const createdUser = await this.createUsersService.execute({
      name,
      email,
      password,
    })

    return response.status(201).json(createdUser)
  }
}
