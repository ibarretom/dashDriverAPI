import { Request, Response } from 'express'
import { z } from 'zod'

import { MostVisitedByDayAddressService } from '../../../service/address/MostVisitedByDayAddress.service'

export class MostVisitedByDayAddressController {
  constructor(
    private mostVisitedByDayAddressService: MostVisitedByDayAddressService
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const mostVisitedSchema = z.object({
      date: z.string(),
    })

    const { date } = mostVisitedSchema.parse(request.query)

    const most_visited = await this.mostVisitedByDayAddressService.execute(date)

    return response.status(200).json(most_visited)
  }
}
