import { Request, Response } from 'express'
import { z } from 'zod'
import { GetRevenueService } from '../../../service/revenue/GetRevenue.service'

export class GetRevenueController {
  constructor(private getRevenueService: GetRevenueService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const getRevenueSchema = z.object({
      date: z.string(),
    })

    const { id: user_id } = request.user

    const { date } = getRevenueSchema.parse(request.query)

    const revenue = await this.getRevenueService.execute({ date, user_id })

    return response.status(200).json(revenue)
  }
}
