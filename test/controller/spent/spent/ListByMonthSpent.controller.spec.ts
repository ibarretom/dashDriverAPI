import { randomUUID } from 'node:crypto'
import request from 'supertest'

import { DataSource } from 'typeorm'
import { app } from '../../../../src/app'

import { AppDataSource } from '../../../../src/config/typeorm'
import { Spent } from '../../../../src/entities/Spent.entity'

let connection: DataSource

let id1 = randomUUID()
let id2 = randomUUID()

let token: string
let token_user_2: string

describe('List spent by month controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id1}', 'admin', 'admin@admin.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, photo_url, created_at, updated_at)
    values('${id2}', 'user', 'user@regular.com', '$2b$08$vTHAG8Xf6UH5QL84amgWue4sG.EsJaC/jC6htNCTAC7k0ktsvhJLu', null, now(), now())
    `)

    const auth_response = await request(app).post('/auth/signin').send({
      email: 'admin@admin.com',
      password: '12345678',
    })

    token = auth_response.body.token

    await request(app)
      .post('/spent')
      .send({
        spent_type: 'aluguel_de_carro',
        amount: 12.75,
        spent_date: new Date('2023-03-30 23:59:59').toISOString(),
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent')
      .send({
        spent_type: 'manutencao',
        amount: 12.75,
        spent_date: new Date('2023-04-01 00:00:00').toISOString(),
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent')
      .send({
        spent_type: 'almoco',
        amount: 12.75,
        spent_date: new Date('2023-04-01 23:59:59').toISOString(),
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent')
      .send({
        spent_type: 'outros',
        amount: 12.75,
        spent_date: new Date('2023-05-01 00:00:00').toISOString(),
        description: 'description',
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
      .post('/spent')
      .send({
        spent_type: 'manutencao',
        amount: 12.75,
        spent_date: new Date('2023-04-01 00:00:00').toISOString(),
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token_user_2}`,
      })
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })
  it('Should be able to list all registered spent by month', async () => {
    const spent_response = await request(app)
      .get('/spent/getByMonth')
      .send({
        iso_date: new Date(2023, 3, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent = spent_response.body

    expect(spent).toHaveLength(2)

    spent.forEach((s: Spent) => {
      const month = new Date(s.spent_date).getMonth()
      const year = new Date(s.spent_date).getFullYear()

      expect(month).toBe(3)
      expect(year).toBe(2023)
    })

    /* Month 3 */

    const spent_response_2 = await request(app)
      .get('/spent/getByMonth')
      .send({
        iso_date: new Date(2023, 2, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent_2 = spent_response_2.body

    expect(spent_2).toHaveLength(1)

    spent_2.forEach((s: Spent) => {
      const month = new Date(s.spent_date).getMonth()
      const year = new Date(s.spent_date).getFullYear()

      expect(month).toBe(2)
      expect(year).toBe(2023)
    })

    /* Month 5 */

    const spent_response_3 = await request(app)
      .get('/spent/getByMonth')
      .send({
        iso_date: new Date(2023, 4, 1).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const spent_3 = spent_response_3.body

    expect(spent_3).toHaveLength(1)

    spent_3.forEach((s: Spent) => {
      const month = new Date(s.spent_date).getMonth()
      const year = new Date(s.spent_date).getFullYear()

      expect(month).toBe(4)
      expect(year).toBe(2023)
    })
  })
})
