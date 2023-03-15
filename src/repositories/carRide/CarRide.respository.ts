import { Between, Repository } from 'typeorm'

import { AppDataSource } from '../../config/typeorm'

import { CarRide } from '../../entities/CarRide.entity'

import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'
import { ICarRideRepository } from './ICarRideRepository'
import { IMonthDateDto } from '../../dto/carRide/IMonthDate.dto'

export class CarRideRepository implements ICarRideRepository {
  private repository: Repository<CarRide>

  constructor() {
    this.repository = AppDataSource.getRepository(CarRide)
  }

  async create(car_ride: ICarRideDto): Promise<CarRide> {
    const createdCarRide = this.repository.create(car_ride)

    return await this.repository.save(createdCarRide)
  }

  async findByMonth(
    { year, month }: IMonthDateDto,
    user_id: string
  ): Promise<CarRide[]> {
    const car_rides = await this.repository.find({
      relations: {
        address: true,
      },
      where: {
        user_id,
        car_ride_date: Between(
          new Date(year, month, 0, 0, 0, 0, 0).toISOString(),
          new Date(year, month + 1, 0, 0, 0, 0).toISOString() // 0 pega o dia anterior ao ultimo do mes month + 1
        ),
      },
    })

    return car_rides
  }
}
