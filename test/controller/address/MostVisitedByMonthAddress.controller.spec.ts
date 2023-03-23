import { randomUUID } from 'node:crypto'
import { DataSource } from 'typeorm'
import request from 'supertest'

import { AppDataSource } from '../../../src/config/typeorm'
import { app } from '../../../src/app'

let connection: DataSource
let id1 = randomUUID()
let token: string

describe('Most visited address by month controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id1}', 'admin', 'admin@admin.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    const sign_in_response = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    token = sign_in_response.body.token

    await request(app)
      .post('/carride')
      .send({
        amount: 13.75,
        address: {
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
        },
        iso_date: new Date(2023, 2, 1, 23, 59, 59).toISOString() /* 23 horas */,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/carride')
      .send({
        amount: 13.75,
        address: {
          zip_code: 24130001,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'Alameda São Boaventura',
          neighborhood: 'Fonseca',
        },
        iso_date: new Date(2023, 2, 2).toISOString() /* 24 horas */,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/carride')
      .send({
        amount: 13.75,
        address: {
          zip_code: 24110002,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R. Benjamin Constant',
          neighborhood: 'Barreto',
        },
        iso_date: new Date(2023, 2, 3, 6, 0, 0).toISOString() /* 6 horas */,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to list all addresses most visited by month', async () => {
    const address_response = await request(app)
      .get('/address/mostVisitedByMonth')
      .send({
        date: new Date(2023, 2, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const address = address_response.body

    expect(address).toHaveLength(3)
  })
})
