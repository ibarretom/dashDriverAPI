import { randomUUID } from 'crypto'
import { DataSource } from 'typeorm'
import request from 'supertest'

import { AppDataSource } from '../../../../src/config/typeorm'
import { app } from '../../../../src/app'

let connection: DataSource
let id1 = randomUUID()
let token: string

describe('Create fuel spent controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id1}', 'admin', 'admin@admin.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    const auth_request = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    token = auth_request.body.token
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to create a new fuel spent with a valid type', async () => {
    const fuel_request = await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 20.32,
        fuel_date: '2023-03-17T01:03:42.598Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const fuel = fuel_request.body

    expect(fuel.id).toBeDefined()

    /* Etanol */
    const fuel_request_2 = await request(app)
      .post('/spent/fuel')
      .send({
        type: 'etanol',
        liters: 4.5,
        amount: 20.32,
        fuel_date: '2023-03-17T01:03:42.598Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const fuel_2 = fuel_request_2.body

    expect(fuel_2.id).toBeDefined()

    /* Gas natural */
    const fuel_request_3 = await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gas_natural',
        liters: 4.5,
        amount: 20.32,
        fuel_date: '2023-03-17T01:03:42.598Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const fuel_3 = fuel_request_3.body

    expect(fuel_3.id).toBeDefined()
  })

  it('Should not be able to register a fuel spent with an invalid type', async () => {
    const fuel_request = await request(app)
      .post('/spent/fuel')
      .send({
        type: 'wrong_type',
        liters: 4.5,
        amount: 20.32,
        fuel_date: '2023-03-17T01:03:42.598Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const error = fuel_request.body

    expect(error.message).toBe(
      'invalid input value for enum fuel_type_enum: "wrong_type"'
    )
  })
})
