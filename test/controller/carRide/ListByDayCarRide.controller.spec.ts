import { randomUUID } from 'node:crypto'
import { DataSource } from 'typeorm'
import request from 'supertest'

import { AppDataSource } from '../../../src/config/typeorm'
import { app } from '../../../src/app'
import { CarRide } from '../../../src/entities/CarRide.entity'

let connection: DataSource

let user_id = randomUUID()
let address_id = randomUUID()
let token: string

describe('List by day car ride controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${user_id}', 'admin', 'admin@admin.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    await connection.query(`
    INSERT INTO ADDRESS(id, zip_code, federated_unit, city, neighborhood, street, created_at)
    values('${address_id}', 24020071, 'RJ', 'Niterói', 'Icaraí', 'R Lopes Trovão', now())
    `)

    const auth_response = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    token = auth_response.body.token

    await request(app)
      .post('/carride')
      .send({
        amount: 13.75,
        address: {
          zip_code: 24020071,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Lopes Trovão',
          neighborhood: 'Icaraí',
        },
        iso_date: '2023-04-05T02:59:59.000Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/carride')
      .send({
        amount: 13.75,
        address: {
          zip_code: 24020071,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Lopes Trovão',
          neighborhood: 'Icaraí',
        },
        iso_date: '2023-04-05T03:00:00.000Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/carride')
      .send({
        amount: 13.75,
        address: {
          zip_code: 24020071,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Lopes Trovão',
          neighborhood: 'Icaraí',
        },
        iso_date: '2023-04-06T02:59:00.000Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/carride')
      .send({
        amount: 13.75,
        address: {
          zip_code: 24020071,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Lopes Trovão',
          neighborhood: 'Icaraí',
        },
        iso_date: '2023-04-06T03:00:00.000Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to list a car ride by day', async () => {
    const list_response = await request(app)
      .get('/carRide/getByDay')
      .send({
        iso_date: new Date(2023, 3, 5).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_rides_list = list_response.body

    expect(car_rides_list).toHaveLength(2)

    car_rides_list.forEach((c: CarRide) => {
      const date = new Date(c.car_ride_date)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      expect(day).toBe(5)
      expect(month).toBe(3) // A função get month começa a contar do zero
      expect(year).toBe(2023)
    })

    /* Dia 4*/

    const list_response_2 = await request(app)
      .get('/carRide/getByDay')
      .send({
        iso_date: new Date(2023, 3, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_rides_list_2 = list_response_2.body

    expect(car_rides_list_2).toHaveLength(1)

    car_rides_list_2.forEach((c: CarRide) => {
      const date = new Date(c.car_ride_date)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      expect(day).toBe(4)
      expect(month).toBe(3) // A função get month começa a contar do zero
      expect(year).toBe(2023)
    })

    /* Dia 6*/

    const list_response_3 = await request(app)
      .get('/carRide/getByDay')
      .send({
        iso_date: new Date(2023, 3, 6).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_rides_list_3 = list_response_3.body

    expect(car_rides_list_3).toHaveLength(1)

    car_rides_list_3.forEach((c: CarRide) => {
      const date = new Date(c.car_ride_date)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      expect(day).toBe(6)
      expect(month).toBe(3) // A função get month começa a contar do zero
      expect(year).toBe(2023)
    })
  })
})
