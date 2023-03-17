import { Request, Response } from 'express'
import { z } from 'zod'

import { ListByMonthFuelService } from '../../../../service/spent/Fuel/ListByMonthFuel.service'

export class ListByMonthFuelController {
  constructor(private listByMonthFuelService: ListByMonthFuelService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const findByMonthSchema = z.object({
      iso_date: z.string(),
    })

    const { id: user_id } = request.user
    const { iso_date } = findByMonthSchema.parse(request.body)

    const fuels = await this.listByMonthFuelService.execute({
      date: iso_date,
      user_id,
    })

    return response.status(200).json(fuels)
  }
}
