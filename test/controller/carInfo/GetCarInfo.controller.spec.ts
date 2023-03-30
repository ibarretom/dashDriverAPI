import { randomUUID } from 'node:crypto'
import { DataSource } from 'typeorm'
import request from 'supertest'

import { AppDataSource } from '../../../src/config/typeorm'
import { app } from '../../../src/app'

let connection: DataSource
let id1 = randomUUID()
let token: string

describe('Get car info controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id1}', 'admin', 'admin@admin.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    const auth_response = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    token = auth_response.body.token

    await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'inicio',
        kilometer_date: new Date(2022, 2, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/kilometer')
      .send({
        amount: 12375,
        moment: 'fim',
        kilometer_date: new Date(2022, 2, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 25,
        fuel_date: new Date(2022, 2, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'etanol',
        liters: 4.5,
        amount: 20,
        fuel_date: new Date(2022, 2, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gas_natural',
        liters: 10,
        amount: 20,
        fuel_date: new Date(2022, 2, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to get the car info by month', async () => {
    const car_info_response = await request(app)
      .get('/carInfo')
      .query({
        iso_date: new Date(2022, 2, 24).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_info = car_info_response.body

    expect(car_info.kilometers).toBe(30)
    expect(car_info.fuel.gasoline).toBe(4.5)
    expect(car_info.fuel.gas).toBe(10)
    expect(car_info.fuel.etanol).toBe(4.5)
    expect(car_info.total_amount_fuel).toBe(65)
  })
})
