import { Request, Response } from 'express'
import { z } from 'zod'

import { ListByDayCarRideService } from '../../../service/carRide/ListByDayCarRide.service'

export class ListByDayCarRideController {
  constructor(private listByDayCarRide: ListByDayCarRideService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listByDaySchema = z.object({
      iso_date: z.string(),
    })

    const { id: user_id } = request.user
    const { iso_date } = listByDaySchema.parse(request.body)

    const rides = await this.listByDayCarRide.execute({
      date: iso_date,
      user_id,
    })

    return response.status(200).json(rides)
  }
}
