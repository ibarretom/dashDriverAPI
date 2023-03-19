import { randomUUID } from 'node:crypto'
import request from 'supertest'

import { DataSource } from 'typeorm'
import { app } from '../../../src/app'
import { AppDataSource } from '../../../src/config/typeorm'
import { Earning } from '../../../src/entities/Earning.entity'

let connection: DataSource
let token: string
let token_user_2: string

let user_id = randomUUID()
let user_id_2 = randomUUID()

describe('List by month car ride controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${user_id}', 'admin', 'admin@admin.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${user_id_2}', 'user', 'user@regular.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    const auth_response = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    token = auth_response.body.token
    await request(app)
      .post('/earning')
      .send({
        amount: 12.75,
        earning_date: new Date(2023, 3, 0, 23, 59, 59).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/earning')
      .send({
        amount: 12.75,
        earning_date: new Date(2023, 3, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/earning')
      .send({
        amount: 12.75,
        earning_date: new Date(2023, 4, 0, 23, 59, 59).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/earning')
      .send({
        amount: 12.75,
        earning_date: new Date(2023, 4, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const auth_response_2 = await request(app).post('/auth/signin').send({
      email: 'user@regular.com',
      password: '12345678',
    })

    token_user_2 = auth_response_2.body.token

    await request(app)
      .post('/earning')
      .send({
        amount: 12.75,
        earning_date: new Date(2023, 3, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token_user_2}`,
      })
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should  be able to list all earnings by month', async () => {
    const earnings_response = await request(app)
      .get('/earning/listByMonth')
      .send({
        iso_date: new Date(2023, 3, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const earnings = earnings_response.body

    expect(earnings).toHaveLength(2)

    earnings.forEach((e: Earning) => {
      const month = new Date(e.earning_date).getMonth()
      const year = new Date(e.earning_date).getFullYear()

      expect(month).toBe(3)
      expect(year).toBe(2023)

      expect(e.user_id).toBe(user_id)
    })

    const earnings_response_2 = await request(app)
      .get('/earning/listByMonth')
      .send({
        iso_date: new Date(2023, 2, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const earnings_2 = earnings_response_2.body

    expect(earnings_2).toHaveLength(1)

    earnings_2.forEach((e: Earning) => {
      const month = new Date(e.earning_date).getMonth()
      const year = new Date(e.earning_date).getFullYear()

      expect(month).toBe(2)
      expect(year).toBe(2023)

      expect(e.user_id).toBe(user_id)
    })

    const earnings_response_3 = await request(app)
      .get('/earning/listByMonth')
      .send({
        iso_date: new Date(2023, 4, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const earnings_3 = earnings_response_3.body

    expect(earnings_3).toHaveLength(1)

    earnings_3.forEach((e: Earning) => {
      const month = new Date(e.earning_date).getMonth()
      const year = new Date(e.earning_date).getFullYear()

      expect(month).toBe(4)
      expect(year).toBe(2023)

      expect(e.user_id).toBe(user_id)
    })
  })
})
