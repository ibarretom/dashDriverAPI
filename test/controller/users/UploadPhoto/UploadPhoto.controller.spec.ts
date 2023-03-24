import { randomUUID } from 'node:crypto'
import { DataSource } from 'typeorm'
import request from 'supertest'

import { AppDataSource } from '../../../../src/config/typeorm'
import { app } from '../../../../src/app'

let connection: DataSource
let id1 = randomUUID()
let token: string

describe('Upload photo controller', () => {
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
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to upload a profile photo', async () => {
    const filePath = `${__dirname}/test.jpg`

    const upload_response = await request(app)
      .patch('/users/avatar')
      .attach('file', filePath)
      .set({
        Authorization: `Bearer ${token}`,
      })

    const user = upload_response.body

    expect(user.avatar).toBeDefined()
  })
})
