import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateSpentService } from '../../../../service/spent/spent/CreateSpent.service'

export class CreateSpentController {
  constructor(private createSpentService: CreateSpentService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const spentSchema = z.object({
      spent_type: z.string(),
      spent_date: z.string(),
      description: z.string().optional(),
    })

    const { id: user_id } = request.user
    const { spent_type, spent_date, description } = spentSchema.parse(
      request.body
    )

    const spent = await this.createSpentService.execute({
      user_id,
      spent_type,
      spent_date,
      description,
    })

    return response.status(201).json(spent)
  }
}
