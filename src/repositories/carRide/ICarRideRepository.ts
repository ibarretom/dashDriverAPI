import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'
import { IMonthDateDto } from '../../dto/carRide/IMonthDate.dto'

import { CarRide } from '../../entities/CarRide.entity'

export interface ICarRideRepository {
  create(car_ride: ICarRideDto): Promise<CarRide>

  findByMonth(date: IMonthDateDto, user_id: string): Promise<CarRide[]>
}
