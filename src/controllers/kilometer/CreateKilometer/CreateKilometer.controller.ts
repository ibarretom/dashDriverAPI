import { Request, Response } from 'express'
import { z } from 'zod'

import { CreateKilometerService } from '../../../service/kilometer/CreateKilometer.service'

export class CreateKilometerController {
  constructor(private createKilometerService: CreateKilometerService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const createKilometerSchema = z.object({
      amount: z.number().positive(),
      moment: z.string(),
      kilometer_date: z.string(),
    })

    const { id: user_id } = request.user
    const { amount, moment, kilometer_date } = createKilometerSchema.parse(
      request.body
    )

    const kilometer = await this.createKilometerService.execute({
      user_id,
      amount,
      moment,
      kilometer_date,
    })

    return response.status(201).json(kilometer)
  }
}
