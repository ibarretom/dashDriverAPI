import { DataSource } from 'typeorm'

import { User } from '../entities/User.entity'
import { Address } from '../entities/Address.entity'
import { CarRide } from '../entities/CarRide.entity'
import { Spent } from '../entities/Spent.entity'
import { Fuel } from '../entities/Fuel.entity'
import { Earning } from '../entities/Earning.entity'
import { Kilometer } from '../entities/Kilometer.entity'

import { createUser1678407280639 } from '../migrations/1678407280639-create_user'
import { createAddress1678744670794 } from '../migrations/1678744670794-create_address'
import { createCarRide1678747846826 } from '../migrations/1678747846826-create_car_ride'
import { createSpent1678929364763 } from '../migrations/1678929364763-create_spent'
import { createFuelSpent1679010899517 } from '../migrations/1679010899517-create_fuel_spent'
import { alterSpentAddColumnAmount1679018157935 } from '../migrations/1679018157935-alter_spent_add_column_amount'
import { createEarning1679175005807 } from '../migrations/1679175005807-create_earning'
import { createKilometer1679195298438 } from '../migrations/1679195298438-create_kilometer'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.NODE_ENV == 'test' ? 5433 : 5432,
  username: 'root',
  password: 'password',
  database: process.env.NODE_ENV == 'test' ? 'dash_driver_test' : 'dash_driver',
  entities: [User, Address, CarRide, Spent, Fuel, Earning, Kilometer],
  migrations: [
    createUser1678407280639,
    createAddress1678744670794,
    createCarRide1678747846826,
    createSpent1678929364763,
    createFuelSpent1679010899517,
    alterSpentAddColumnAmount1679018157935,
    createEarning1679175005807,
    createKilometer1679195298438,
  ],
  synchronize: true,
  logging: false,
})

export { AppDataSource }
