import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateCarRideService } from '../../../service/carRide/CreateCarRide.service'

export class CarRideController {
  constructor(private createCarRideService: CreateCarRideService) {}

  async handle(request: Request, response: Response) {
    const carRideSchema = z.object({
      address: z.object({
        zip_code: z
          .number({
            required_error: 'Zip code is required',
            invalid_type_error: 'Zip code must be a number',
          })
          .int({ message: 'Zip code must be a integer' }),
        federated_unit: z
          .string({
            required_error: 'Federated Unit is required',
            invalid_type_error: 'Federated Unit must be a string',
          })
          .length(2, 'Federated Unit must be a string with 2 characters'),
        city: z.string({
          required_error: 'City is required',
          invalid_type_error: 'City must be a string',
        }),
        street: z.string({
          required_error: 'Street is required',
          invalid_type_error: 'Street must be a string',
        }),
        neighborhood: z.string({
          required_error: 'Neighborhood is required',
          invalid_type_error: 'Neighborhood must be a string',
        }),
      }),
      amount: z.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      }),
      date: z.string({
        required_error: 'Date is required',
        invalid_type_error: 'Date must be a string',
      }),
    })

    const user = request.user

    const { address, amount, date } = carRideSchema.parse(request.body)

    const carRide = await this.createCarRideService.execute({
      user_id: user.id,
      address,
      amount,
      date,
    })

    return response.status(201).json(carRide)
  }
}
