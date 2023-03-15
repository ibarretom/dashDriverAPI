import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'

import { CarRide } from '../../entities/CarRide.entity'

export interface ICarRideRepository {
  create(car_ride: ICarRideDto): Promise<CarRide>
}
