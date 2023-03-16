import { DataSource } from 'typeorm'
import { randomUUID } from 'node:crypto'
import request from 'supertest'

import { AppDataSource } from '../../../../src/config/typeorm'
import { app } from '../../../../src/app'

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

  it('Should be able to register a new spent with valid spent_types', async () => {
    const spent_request_1 = await request(app)
      .post('/spent')
      .send({
        spent_type: 'aluguel_de_carro',
        spent_date: '2023-03-03T03:00:00.000Z',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent_1 = spent_request_1.body

    expect(spent_1.id).toBeDefined()

    const spent_request_2 = await request(app)
      .post('/spent')
      .send({
        spent_type: 'manutencao',
        spent_date: '2023-03-03T03:00:00.000Z',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent_2 = spent_request_2.body

    expect(spent_2.id).toBeDefined()

    const spent_request_3 = await request(app)
      .post('/spent')
      .send({
        spent_type: 'almoco',
        spent_date: '2023-03-03T03:00:00.000Z',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent_3 = spent_request_3.body

    expect(spent_3.id).toBeDefined()

    const spent_request_4 = await request(app)
      .post('/spent')
      .send({
        spent_type: 'outros',
        spent_date: '2023-03-03T03:00:00.000Z',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent_4 = spent_request_4.body

    expect(spent_4.id).toBeDefined()
  })

  it('Should not be able to create a spent with invalid spent_type', async () => {
    const spent_request = await request(app)
      .post('/spent')
      .send({
        spent_type: 'wrong_enum',
        spent_date: '2023-03-03T03:00:00.000Z',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent = spent_request.body

    expect(spent_request.status).toBe(500)
    expect(spent.message).toBe(
      'invalid input value for enum spent_spent_type_enum: "wrong_enum"'
    )
  })
})
