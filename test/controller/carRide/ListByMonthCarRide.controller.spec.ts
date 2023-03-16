import { randomUUID } from 'node:crypto'
import request from 'supertest'

import { DataSource } from 'typeorm'
import { app } from '../../../src/app'
import { AppDataSource } from '../../../src/config/typeorm'

import { CarRide } from '../../../src/entities/CarRide.entity'

let connection: DataSource
let token: string

let user_id = randomUUID()
let address_id = randomUUID()

describe('List by month car ride controller', () => {
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
        iso_date: new Date('2023-02-28 23:59:59').toISOString(),
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
        iso_date: new Date('2023-03-1 00:00:00').toISOString(),
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
        iso_date: new Date('2023-03-31 23:59:59').toISOString(),
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
        iso_date: new Date('2023-04-1 00:00:00').toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to see all car rides listed by month', async () => {
    const car_rides_response = await request(app)
      .get('/carRide/getByMonth')
      .send({
        iso_date: new Date('2023-03-2').toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_rides = car_rides_response.body

    expect(car_rides).toHaveLength(2)

    car_rides.forEach((cr: CarRide) => {
      const month = new Date(cr.car_ride_date).getMonth() + 1
      expect(month).toBe(3)
    })

    /* Month 4 */

    const car_rides_response_2 = await request(app)
      .get('/carRide/getByMonth')
      .send({
        iso_date: new Date('2023-04-2').toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_rides_2 = car_rides_response_2.body

    expect(car_rides_2).toHaveLength(1)

    car_rides_2.forEach((cr: CarRide) => {
      const month = new Date(cr.car_ride_date).getMonth() + 1
      expect(month).toBe(4)
    })

    /* Month 2 */

    const car_rides_response_3 = await request(app)
      .get('/carRide/getByMonth')
      .send({
        iso_date: new Date('2023-02-2').toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_rides_3 = car_rides_response_3.body

    expect(car_rides_3).toHaveLength(1)

    car_rides_3.forEach((cr: CarRide) => {
      const month = new Date(cr.car_ride_date).getMonth() + 1
      expect(month).toBe(2)
    })
  })

  it('Should be able to see the completed address when querying a ride', async () => {
    const car_rides_response = await request(app)
      .get('/carRide/getByMonth')
      .send({
        iso_date: new Date('2023-02-2').toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const car_rides = car_rides_response.body

    expect(car_rides).toHaveLength(1)

    expect(car_rides[0]).toHaveProperty('address')
    expect(car_rides[0]).toHaveProperty('address.id')
    expect(car_rides[0]).toHaveProperty('address.created_at')
  })
})
