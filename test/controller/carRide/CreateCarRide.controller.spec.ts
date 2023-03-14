import { randomUUID } from 'node:crypto'
import request from 'supertest'

import { DataSource } from 'typeorm'
import { app } from '../../../src/app'

import { AppDataSource } from '../../../src/config/typeorm'

let connection: DataSource
let id1: string
let id2: string

describe('Create car ride', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()
    id1 = randomUUID()

    id2 = randomUUID()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id1}', 'admin', 'admin@admin.com', 'jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    await connection.query(`
    INSERT INTO ADDRESS(id, zip_code, federated_unit, city, neighborhood, street, created_at)
    values('${id2}', 24020071, 'RJ', 'Niterói', 'Icaraí', 'R Lopes Trovão', now())
    `)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to register a new car ride', async () => {
    const sign_in_response = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    const token = sign_in_response.body.token

    const created_car_ride = await request(app)
      .post('/carride')
      .send({
        user_id: '6f03524c-07cd-4df2-8988-c25aabbf4bcf',
        amount: 13.75,
        address: {
          zip_code: 24445570,
          federated_unit: 'RJ',
          city: 'São Gonçalo',
          street: 'Rua Luiz Camões',
          neighborhood: 'Estrela do Norte',
        },
        date: '2023-03-14T05:48:07.812Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(created_car_ride.body.id).toBeDefined()
    expect(created_car_ride.body.address_id).toBeDefined()
    expect(created_car_ride.body.created_at).toBeDefined()
  })

  it('Should not create a new Address when a saved one is provided', async () => {
    const sign_in_response = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    const token = sign_in_response.body.token

    const created_car_ride = await request(app)
      .post('/carride')
      .send({
        user_id: '6f03524c-07cd-4df2-8988-c25aabbf4bcf',
        amount: 13.75,
        address: {
          zip_code: 24020071,
          federated_unit: 'RJ',
          city: 'Niterói',
          street: 'R Lopes Trovão',
          neighborhood: 'Icaraí',
        },
        date: '2023-03-14T05:48:07.812Z',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(created_car_ride.body.id).toBeDefined()
    expect(created_car_ride.body.address_id).toBe(id2)
    expect(created_car_ride.body.created_at).toBeDefined()
  })
})
