import { Repository } from 'typeorm'

import { AppDataSource } from '../../config/typeorm'

import { CarRide } from '../../entities/CarRide.entity'

import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'
import { ICarRideRepository } from './ICarRideRepository'

export class CarRideRepository implements ICarRideRepository {
  private repository: Repository<CarRide>

  constructor() {
    this.repository = AppDataSource.getRepository(CarRide)
  }

  async create(car_ride: ICarRideDto): Promise<CarRide> {
    const createdCarRide = this.repository.create(car_ride)

    return await this.repository.save(createdCarRide)
  }
}
