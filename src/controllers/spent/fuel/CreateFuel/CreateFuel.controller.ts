import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateFuelService } from '../../../../service/spent/Fuel/CreateFuel.service'

export class CreateFuelController {
  constructor(private createFuelService: CreateFuelService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const createFuelSchema = z.object({
      type: z.string(),
      liters: z.number(),
      amount: z.number(),
      fuel_date: z.string(),
    })

    const { id: user_id } = request.user
    const { type, liters, amount, fuel_date } = createFuelSchema.parse(
      request.body
    )

    const fuel = await this.createFuelService.execute({
      type,
      liters,
      amount,
      fuel_date,
      user_id,
    })

    return response.status(201).json(fuel)
  }
}
