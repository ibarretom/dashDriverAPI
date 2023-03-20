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

  it('Should be able to create a new begin or end kilometer', async () => {
    const begin_kilometer_response = await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'inicio',
        kilometer_date: new Date(2023, 1, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const begin_kilometer = begin_kilometer_response.body

    expect(begin_kilometer.id).toBeDefined()

    const end_kilometer_response = await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'fim',
        kilometer_date: new Date(2023, 1, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const end_kilometer = end_kilometer_response.body

    expect(end_kilometer.id).toBeDefined()
  })

  it('Should not be able to create a kilometer with a moment that is already register', async () => {
    await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'inicio',
        kilometer_date: new Date(2023, 1, 5).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const begin_kilometer_response = await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'inicio',
        kilometer_date: new Date(2023, 1, 5).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(begin_kilometer_response.status).toBe(400)
    expect(begin_kilometer_response.body.message).toBe(
      'Kilometer was already registered'
    )
    await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'inicio',
        kilometer_date: new Date(2023, 1, 3).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    const end_kilometer_response = await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'inicio',
        kilometer_date: new Date(2023, 1, 3).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
    expect(end_kilometer_response.status).toBe(400)
    expect(end_kilometer_response.body.message).toBe(
      'Kilometer was already registered'
    )
  })

  it('Should no be able to register a begin or end kilometer with invalid amount', async () => {
    await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'inicio',
        kilometer_date: new Date(2023, 1, 7).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const end_km_response = await request(app)
      .post('/kilometer')
      .send({
        amount: 12344,
        moment: 'fim',
        kilometer_date: new Date(2023, 1, 7).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const end_km_error = end_km_response.body

    expect(end_km_response.status).toBe(400)
    expect(end_km_error.message).toBe('Kilometer is with invalid amount')

    await request(app)
      .post('/kilometer')
      .send({
        amount: 12345,
        moment: 'fim',
        kilometer_date: new Date(2023, 1, 8).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const begin_km_response = await request(app)
      .post('/kilometer')
      .send({
        amount: 12346,
        moment: 'inicio',
        kilometer_date: new Date(2023, 1, 8).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const begin_km_error = begin_km_response.body

    expect(begin_km_response.status).toBe(400)
    expect(begin_km_error.message).toBe('Kilometer is with invalid amount')
  })
})
