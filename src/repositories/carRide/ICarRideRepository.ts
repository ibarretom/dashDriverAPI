import { ICarRideDto } from '../../dto/ICarRide.dto'
import { CarRide } from '../../entities/CarRide.entity'

export interface ICarRideRepository {
  create(car_ride: ICarRideDto): Promise<CarRide>
}
