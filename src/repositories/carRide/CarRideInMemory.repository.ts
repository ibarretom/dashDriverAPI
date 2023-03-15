import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'
import { ICarRideRepository } from './ICarRideRepository'
import { IMonthDateDto } from '../../dto/carRide/IMonthDate.dto'

import { CarRide } from '../../entities/CarRide.entity'

import { randomUUID } from 'crypto'

export class CarRideInMemoryRepository implements ICarRideRepository {
  private repository: CarRide[]

  constructor() {
    this.repository = [
      {
        id: 'test-id-0',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: '2023-03-01T00:00:00Z',
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-1',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: '2023-03-31T00:00:00Z',
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-2',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: '2023-02-28T00:00:00Z',
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-3',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: '2023-04-01T00:00:00Z',
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-4',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: '2023-03-14T02:48:07.812',
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-4',
        user_id: 'test-user-2-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: '2023-03-14T02:48:07.812',
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
          created_at: new Date().toISOString(),
        },
      },
    ]
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

  async findByMonth(
    { month, year }: IMonthDateDto,
    user_id: string
  ): Promise<CarRide[]> {
    const carRides = this.repository.filter((cr) => {
      const date = cr.car_ride_date.split('T')[0]

      const m = Number(date.split('-')[1]) - 1 // o getMonth começa de 0, portanto, tira 1 da ISO string
      const y = Number(date.split('-')[0])

      if (month == m && year == y && user_id == cr.user_id) {
        return cr
      }
    })

    return carRides
  }
}
