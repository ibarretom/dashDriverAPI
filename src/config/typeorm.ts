import { DataSource } from 'typeorm'

import { User } from '../entities/User'
import { Address } from '../entities/Address.entity'
import { CarRide } from '../entities/CarRide.entity'

import { createUser1678407280639 } from '../migrations/1678407280639-create_user'
import { createAddress1678744670794 } from '../migrations/1678744670794-create_address'
import { createCarRide1678747846826 } from '../migrations/1678747846826-create_car_ride'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.NODE_ENV == 'test' ? 5433 : 5432,
  username: 'root',
  password: 'password',
  database: process.env.NODE_ENV == 'test' ? 'dash_driver_test' : 'dash_driver',
  entities: [User, Address, CarRide],
  migrations: [
    createUser1678407280639,
    createAddress1678744670794,
    createCarRide1678747846826,
  ],
  synchronize: true,
  logging: false,
})

export { AppDataSource }
