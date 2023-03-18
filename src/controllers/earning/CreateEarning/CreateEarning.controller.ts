import { Request, Response } from 'express'
import { z } from 'zod'

import { CreateEarningService } from '../../../service/earning/CreateEarning.service'

export class CreateEarningController {
  constructor(private createEarningService: CreateEarningService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const createEarningSchema = z.object({
      amount: z.number().positive(),
      earning_date: z.string(),
    })

    const { id: user_id } = request.user
    const { amount, earning_date } = createEarningSchema.parse(request.body)

    const earning = await this.createEarningService.execute({
      user_id,
      amount,
      earning_date,
    })

    return response.status(201).json(earning)
  }
}
