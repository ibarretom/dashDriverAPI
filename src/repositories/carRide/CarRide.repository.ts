import { Between, Repository } from 'typeorm'

import { AppDataSource } from '../../config/typeorm'

import { CarRide } from '../../entities/CarRide.entity'

import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'
import { ICarRideRepository } from './ICarRideRepository'
import { IMonthDateDto } from '../../dto/carRide/IMonthDate.dto'
import { IDayDateDto } from '../../dto/carRide/IDayDate.dto'

export class CarRideRepository implements ICarRideRepository {
  private repository: Repository<CarRide>

  constructor() {
    this.repository = AppDataSource.getRepository(CarRide)
  }

  async create(car_ride: ICarRideDto): Promise<CarRide> {
    const createdCarRide = this.repository.create({
      ...car_ride,
    })

    return await this.repository.save(createdCarRide)
  }

  async findAll(): Promise<CarRide[]> {
    const car_rides = await this.repository.find({
      relations: {
        address: true,
      },
    })

    return car_rides
  }

  async findAllByMonth({ year, month }: IMonthDateDto): Promise<CarRide[]> {
    const car_rides = await this.repository.find({
      relations: {
        address: true,
      },
      where: {
        car_ride_date: Between(
          new Date(year, month, 1, 0, 0, 0, 0),
          new Date(year, month + 1, 0, 23, 59, 59) // 0 pega o dia anterior ao ultimo do mes month + 1
        ),
      },
    })

    return car_rides
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
          new Date(year, month, 1, 0, 0, 0, 0),
          new Date(year, month + 1, 0, 23, 59, 59) // 0 pega o dia anterior ao ultimo do mes month + 1
        ),
      },
    })

    return car_rides
  }

  async findByDay(
    { year, month, day }: IDayDateDto,
    user_id: string
  ): Promise<CarRide[]> {
    const car_rides = await this.repository.find({
      relations: {
        address: true,
      },
      where: {
        user_id,
        car_ride_date: Between(
          new Date(year, month, day),
          new Date(year, month, day, 23, 59, 59)
        ),
      },
    })

    return car_rides
  }
}
