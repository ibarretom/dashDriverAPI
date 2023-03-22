import { Request, Response } from 'express'
import { MostVisitedAddressService } from '../../../service/address/MostVisitedAddress.service'

export class MostVisitedAddressController {
  constructor(private mostVisitedService: MostVisitedAddressService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const most_visited = await this.mostVisitedService.execute()

    return response.status(200).json(most_visited)
  }
}
