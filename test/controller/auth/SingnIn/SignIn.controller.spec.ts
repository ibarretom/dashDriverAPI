import { randomUUID } from 'crypto'
import request from 'supertest'

import { DataSource } from 'typeorm'
import { app } from '../../../../src/app'
import { AppDataSource } from '../../../../src/config/typeorm'

let connection: DataSource

describe('Sign in controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to sign in', async () => {
    const create_user_response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'email@jest.com',
      password: 'password',
    })

    const auth_response = await request(app).post('/auth/signin').send({
      email: 'email@jest.com',
      password: 'password',
    })

    const user = auth_response?.body

    expect(user.name).toBe('John Doe')
    expect(user.photo_url).toBe(null)
    expect(user.token).toBeDefined()
  })

  it('Should not be able to sign with an invalid email', async () => {
    const create_user_response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'email@jest.com',
      password: 'password',
    })

    const auth_response = await request(app).post('/auth/signin').send({
      email: 'wrong@jest.com',
      password: 'password',
    })

    expect(auth_response.status).toBe(401)
    expect(auth_response.body.message).toBe('Invalid email or password')
  })

  it('Should not be able to sign with an invalid email', async () => {
    const create_user_response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'email@jest.com',
      password: 'password',
    })

    const auth_response = await request(app).post('/auth/signin').send({
      email: 'email@jest.com',
      password: 'wrongpassword',
    })

    expect(auth_response.status).toBe(401)
    expect(auth_response.body.message).toBe('Invalid email or password')
  })
})
