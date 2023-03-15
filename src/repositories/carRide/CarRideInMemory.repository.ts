import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'
import { ICarRideRepository } from './ICarRideRepository'

import { CarRide } from '../../entities/CarRide.entity'

export class CarRideInMemoryRepository implements ICarRideRepository {
  private repository: CarRide[]

  constructor() {
    this.repository = []
  }

  async create(car_ride: ICarRideDto): Promise<CarRide> {
    const created_car_ride = new CarRide()

    Object.assign(created_car_ride, {
      id: 'test-id',
      user_id: car_ride.user_id,
      address_id: car_ride.address_id,
      amount: car_ride.amount,
      car_ride_date: car_ride.address_id,
      created_at: new Date().toISOString(),
    })

    this.repository.push(created_car_ride)

    return created_car_ride
  }
}
