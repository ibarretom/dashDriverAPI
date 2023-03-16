import { Request, Response } from 'express'
import { z } from 'zod'
import { ListByMonthSpentService } from '../../../../service/spent/spent/ListByMothSpent.service'

export class ListByMonthSpentController {
  constructor(private listByMonthService: ListByMonthSpentService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listByMonthSchema = z.object({
      iso_date: z.string(),
    })

    const { id: user_id } = request.user
    const { iso_date } = listByMonthSchema.parse(request.body)

    const spent = await this.listByMonthService.execute({
      date: iso_date,
      user_id,
    })

    return response.status(200).json(spent)
  }
}
