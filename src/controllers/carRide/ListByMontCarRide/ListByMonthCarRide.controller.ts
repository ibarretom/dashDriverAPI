import { Request, Response } from 'express'
import { z } from 'zod'

import { ListByMonthCarRideService } from '../../../service/carRide/ListByMonthCarRide.service'

export class ListByMonthCarRideController {
  constructor(private listByMonthCarRideService: ListByMonthCarRideService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const listByMonthSchema = z.object({
      date: z.string(),
    })

    const { date } = listByMonthSchema.parse(request.body)

    const car_rides = await this.listByMonthCarRideService.execute({ date })

    return response.status(200).json(car_rides)
  }
}
