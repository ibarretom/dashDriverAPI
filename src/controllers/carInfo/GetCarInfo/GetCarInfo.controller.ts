import { Request, Response } from 'express'
import { z } from 'zod'
import { GetCarInfoService } from '../../../service/carInfo/GetCarInfo.service'

export class GetCarInfoController {
  constructor(private getCarInfoService: GetCarInfoService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const getCarInfoScheme = z.object({
      iso_date: z.string(),
    })

    const { id: user_id } = request.user
    const { iso_date } = getCarInfoScheme.parse(request.body)

    const car_info = await this.getCarInfoService.execute({
      date: iso_date,
      user_id,
    })

    return response.status(200).json(car_info)
  }
}
