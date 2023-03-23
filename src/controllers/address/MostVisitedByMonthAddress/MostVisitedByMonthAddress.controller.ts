import { Request, Response } from 'express'
import { z } from 'zod'

import { MostVisitedByMonthAddressService } from '../../../service/address/MostVisitedByMonthAddress.service'

export class MostVisitedByMonthAddressController {
  constructor(
    private mostVisitedByMonthService: MostVisitedByMonthAddressService
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const mostVisitedSchema = z.object({
      date: z.string(),
    })

    const { date } = mostVisitedSchema.parse(request.body)

    const most_visited = await this.mostVisitedByMonthService.execute(date)

    return response.status(200).json(most_visited)
  }
}
