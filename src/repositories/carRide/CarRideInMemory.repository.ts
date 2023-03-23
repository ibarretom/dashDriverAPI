import { ICarRideDto } from '../../dto/carRide/ICarRide.dto'
import { ICarRideRepository } from './ICarRideRepository'
import { IMonthDateDto } from '../../dto/carRide/IMonthDate.dto'

import { CarRide } from '../../entities/CarRide.entity'

import { randomUUID } from 'crypto'
import { IDayDateDto } from '../../dto/carRide/IDayDate.dto'

export class CarRideInMemoryRepository implements ICarRideRepository {
  private repository: CarRide[]

  constructor() {
    this.repository = [
      {
        id: 'test-id-0',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: new Date(2023, 2, 0, 21, 0, 0, 0).toISOString(),
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24020084,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Gavião Peixoto',
          neighborhood: 'Icaraí',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-1',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: new Date(
          2023,
          2,
          30,
          21,
          0,
          0,
          0
        ).toISOString() /* 21 horas */,
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24210470,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Pres. Pedreira',
          neighborhood: 'Ingá',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-2',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: new Date(
          2023,
          1,
          27,
          21,
          0,
          0,
          0
        ).toISOString() /* 21 horas */,
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
        car_ride_date: new Date(
          2023,
          3,
          0,
          21,
          0,
          0
        ).toISOString() /* 21 horas */,
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24030060,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Mal. Deodoro',
          neighborhood: 'Centro',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-4',
        user_id: 'test-user-1-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: new Date(
          2023,
          2,
          14,
          23,
          48,
          7
        ).toISOString() /* 23 horas */,
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24030050,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Marquês de Caxias',
          neighborhood: 'Centro',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-4',
        user_id: 'test-user-2-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: new Date(
          2023,
          2,
          13,
          23,
          58,
          7
        ).toISOString() /* 23 horas */,
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
        id: 'test-id-5',
        user_id: 'user-3-test-id',
        address_id: randomUUID(),
        amount: 12.75,
        car_ride_date: new Date(2022, 5, 1).toISOString() /* 24 horas */,
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24360410,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Murilo Portugal',
          neighborhood: 'São Francisco',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-6',
        user_id: 'user-3-test-id',
        address_id: randomUUID(),
        amount: 13.75,
        car_ride_date: new Date(2022, 5, 2).toISOString() /* 24 horas */,
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24130001,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'Alameda São Boaventura',
          neighborhood: 'Fonseca',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-7',
        user_id: 'user-3-test-id',
        address_id: randomUUID(),
        amount: 13.75,
        car_ride_date: new Date(2022, 8, 2, 6, 0, 0).toISOString(),
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24110002,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Benjamin Constant',
          neighborhood: 'Barreto',
          created_at: new Date().toISOString(),
        },
      },
      {
        id: 'test-id-8',
        user_id: 'user-3-test-id',
        address_id: randomUUID(),
        amount: 13.75,
        car_ride_date: new Date(2022, 8, 2, 12, 0, 0).toISOString(),
        created_at: new Date().toISOString(),
        address: {
          id: 'test-id',
          zip_code: 24445600,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Estr. Boqueirão Pequeno',
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

  async findAll(): Promise<CarRide[]> {
    const carRides = this.repository

    return carRides
  }

  async findAllByMonth({ year, month }: IMonthDateDto): Promise<CarRide[]> {
    const carRides = this.repository.filter((cr) => {
      const date = new Date(cr.car_ride_date)

      const m = date.getMonth()
      const y = date.getFullYear()

      if (month == m && year == y) {
        return cr
      }
    })

    return carRides
  }

  async findByMonth(
    { month, year }: IMonthDateDto,
    user_id: string
  ): Promise<CarRide[]> {
    const carRides = this.repository.filter((cr) => {
      const date = new Date(cr.car_ride_date)

      const m = date.getMonth()
      const y = date.getFullYear()

      if (month == m && year == y && user_id == cr.user_id) {
        return cr
      }
    })

    return carRides
  }

  async findByDay(
    { month, year, day }: IDayDateDto,
    user_id: string
  ): Promise<CarRide[]> {
    const carRides = this.repository.filter((cr) => {
      const date = new Date(cr.car_ride_date)

      const d = date.getDate()
      const m = date.getMonth()
      const y = date.getFullYear()

      if (month == m && year == y && day == d && user_id == cr.user_id) {
        return cr
      }
    })

    return carRides
  }
}
