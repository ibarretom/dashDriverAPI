import { randomUUID } from 'node:crypto'
import request from 'supertest'

import { DataSource } from 'typeorm'
import { app } from '../../../src/app'

import { AppDataSource } from '../../../src/config/typeorm'

let connection: DataSource

let id1 = randomUUID()
let id2 = randomUUID()
let token: string

describe('Get revenue controller', () => {
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
        iso_date: new Date(2023, 1, 1).toISOString(),
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
          street: 'R Lopes Trovão',
          neighborhood: 'Icaraí',
        },
        iso_date: new Date(2023, 1, 2).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/earning')
      .send({
        amount: 100,
        earning_date: new Date(2023, 1, 3).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent/fuel')
      .send({
        type: 'gasolina',
        liters: 4.5,
        amount: 20,
        fuel_date: new Date(2023, 1, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent')
      .send({
        spent_type: 'aluguel_de_carro',
        amount: 50,
        spent_date: new Date(2023, 1, 4).toISOString(),
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent')
      .send({
        spent_type: 'manutencao',
        amount: 15,
        spent_date: new Date(2023, 1, 4).toISOString(),
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    await request(app)
      .post('/spent')
      .send({
        spent_type: 'almoco',
        amount: 10,
        spent_date: new Date(2023, 1, 4).toISOString(),
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
        spent_date: new Date(2023, 1, 4).toISOString(),
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to get a revenue by month', async () => {
    const revenue_response = await request(app)
      .get('/revenue')
      .query({
        date: new Date(2023, 1, 4).toISOString(),
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const revenue = revenue_response.body

    const earnings = revenue.earnings
    const spent = revenue.spent
    const total = revenue.total

    earnings.forEach((e: any) => {
      if (e.label == 'Corridas') {
        expect(e.value).toBe(27.5)
      }
      if (e.label == 'Outros') {
        expect(e.value).toBe(100)
      }
    })

    spent.forEach((s: any) => {
      if (s.label == 'Aluguel de carro') {
        expect(s.value).toBe(50)
      } else if (s.label == 'Manutenção') {
        expect(s.value).toBe(15)
      } else if (s.label == 'Almoco') {
        expect(s.value).toBe(10)
      } else if (s.label == 'Outros') {
        expect(s.value).toBe(12.75)
      } else if (s.label == 'Combustível') {
        expect(s.value).toBe(20)
      }
    })

    expect(total[0].value).toBe(19.75)
  })
})
