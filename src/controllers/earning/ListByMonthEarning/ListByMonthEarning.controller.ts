import { Request, Response } from 'express'
import { z } from 'zod'

import { ListByMonthEarningService } from '../../../service/earning/ListByMonthEarning.service'

export class ListByMonthEarningController {
  constructor(private listByMonthEarningService: ListByMonthEarningService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listByMonthSchema = z.object({
      iso_date: z.string(),
    })

    const { id: user_id } = request.user
    const { iso_date } = listByMonthSchema.parse(request.body)

    const earnings = await this.listByMonthEarningService.execute({
      date: iso_date,
      user_id,
    })

    return response.status(200).json(earnings)
  }
}
