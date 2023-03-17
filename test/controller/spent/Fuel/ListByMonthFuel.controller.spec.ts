import { randomUUID } from 'crypto'
import { DataSource } from 'typeorm'
import request from 'supertest'

import { AppDataSource } from '../../../../src/config/typeorm'
import { app } from '../../../../src/app'
import { Fuel } from '../../../../src/entities/Fuel.entity'

let connection: DataSource
let id1 = randomUUID()
let id2 = randomUUID()
let token: string
let token_user_2: string

describe('Create fuel spent controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id1}', 'admin', 'admin@admin.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id2}', 'user', 'user@regular.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    const auth_request = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    token = auth_request.body.token

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 3, 0, 23, 59, 59).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 3, 1, 0, 0, 0).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 4, 0, 23, 59, 59).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 4, 1, 0, 0, 0).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const auth_request_2 = await request(app).post('/auth/signin').send({
      email: 'user@regular.com',
      password: '12345678',
    })

    token_user_2 = auth_request_2.body.token

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: new Date(2023, 4, 0, 23, 59, 59).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token_user_2}`,
      })
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to list all fuels saved by month', async () => {
    const fuel_request_1 = await request(app)
      .get('/spent/fuel/getByMonth')
      .send({
        iso_date: new Date(2023, 3, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const fuels_1 = fuel_request_1.body

    expect(fuels_1).toHaveLength(2)

    fuels_1.forEach((f: Fuel) => {
      const month = new Date(f.fuel_date).getMonth()
      const year = new Date(f.fuel_date).getFullYear()

      expect(month).toBe(3)
      expect(year).toBe(2023)
    })

    const fuel_request_2 = await request(app)
      .get('/spent/fuel/getByMonth')
      .send({
        iso_date: new Date(2023, 2, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const fuels_2 = fuel_request_2.body

    expect(fuels_2).toHaveLength(1)

    fuels_2.forEach((f: Fuel) => {
      const month = new Date(f.fuel_date).getMonth()
      const year = new Date(f.fuel_date).getFullYear()

      expect(month).toBe(2)
      expect(year).toBe(2023)
    })

    const fuel_request_3 = await request(app)
      .get('/spent/fuel/getByMonth')
      .send({
        iso_date: new Date(2023, 4, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const fuels_3 = fuel_request_3.body

    expect(fuels_3).toHaveLength(1)

    fuels_3.forEach((f: Fuel) => {
      const month = new Date(f.fuel_date).getMonth()
      const year = new Date(f.fuel_date).getFullYear()

      expect(month).toBe(4)
      expect(year).toBe(2023)
    })
  })
})
