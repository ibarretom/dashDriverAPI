import { Request, Response } from 'express'
import { z } from 'zod'

import { ListByMonthCarRideService } from '../../../service/carRide/ListByMonthCarRide.service'

export class ListByMonthCarRideController {
  constructor(private listByMonthCarRideService: ListByMonthCarRideService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listByMonthSchema = z.object({
      iso_date: z.string(),
    })

    const { id: user_id } = request.user
    const { iso_date } = listByMonthSchema.parse(request.body)

    const car_rides = await this.listByMonthCarRideService.execute({
      date: iso_date,
      user_id,
    })

    return response.status(200).json(car_rides)
  }
}
