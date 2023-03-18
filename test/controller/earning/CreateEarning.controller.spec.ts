import { DataSource } from 'typeorm'
import { randomUUID } from 'node:crypto'
import request from 'supertest'

import { AppDataSource } from '../../../src/config/typeorm'
import { app } from '../../../src/app'

let connection: DataSource

let id1 = randomUUID()

let token: string

describe('Create spent controller', () => {
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
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to create a new earning', async () => {
    const earning_request = await request(app)
      .post('/earning')
      .send({
        amount: 20.32,
        earning_date: new Date(2023, 3, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const earning = earning_request.body

    expect(earning.id).toBeDefined()
  })
})
