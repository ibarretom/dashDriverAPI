import { DataSource } from 'typeorm'

import { User } from '../entities/User'

import { createUser1678407280639 } from '../migrations/1678407280639-create_user'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'dash_driver',
  entities: [User],
  migrations: [createUser1678407280639],
  synchronize: true,
  logging: false,
})

export { AppDataSource }
